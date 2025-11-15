const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME || 'appdb';
const DB_PORT = process.env.DB_PORT || 3306;

if (!DB_HOST || !DB_USER || !DB_PASS) {
  console.error('DB_HOST, DB_USER, DB_PASS required');
  process.exit(1);
}

let pool;
async function initDB() {
  pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    port: DB_PORT,
    waitForConnections: true,
    connectionLimit: 10
  });

  // create DB if not exists (requires user privileges)
  try {
    await pool.query(`CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100),
      email VARCHAR(255) UNIQUE,
      password VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB;`);
    console.log('users table ensured');
  } catch (err) {
    console.error('Error creating users table (you may need to run db-init.sql manually)', err.message);
  }
}

app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'email+password required' });
  try {
    const hash = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO users (name,email,password) VALUES (?,?,?)', [name, email, hash]);
    res.json({ message: 'signed up' });
  } catch (err) {
    console.error(err);
    if (err && err.code === 'ER_DUP_ENTRY') return res.status(409).json({ message: 'user exists' });
    res.status(500).json({ message: 'error' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE email=?', [email]);
    if (!rows.length) return res.status(401).json({ message: 'invalid' });
    const user = rows[0];
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: 'invalid' });
    res.json({ id: user.id, email: user.email, name: user.name });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'error' });
  }
});

app.get('/health', (_, res) => res.json({ ok: true }));

const port = process.env.PORT || 4000;
initDB().then(() => {
  app.listen(port, () => console.log('backend listening', port));
}).catch(err => { console.error('DB init failed', err); process.exit(1); });
