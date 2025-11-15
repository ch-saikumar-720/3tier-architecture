import React, { useState } from 'react';
import { login } from '../services/auth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setError('');
    const res = await login(form);
    if (res.token) {
      localStorage.setItem('token', res.token);
      nav('/dashboard');
    } else {
      setError(res.message || 'Login failed');
    }
  }

  return (
    <div className="container">
      <header><h2>Login</h2></header>
      <form onSubmit={submit}>
        <div className="field">
          <input required type="email" placeholder="Email" value={form.email} onChange={e => setForm({...form,email:e.target.value})}/>
        </div>
        <div className="field">
          <input required type="password" placeholder="Password" value={form.password} onChange={e => setForm({...form,password:e.target.value})}/>
        </div>
        {error && <div style={{color:'red', marginBottom:10}}>{error}</div>}
        <div style={{display:'flex', gap:8}}>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}
