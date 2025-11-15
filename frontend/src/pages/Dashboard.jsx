import React, { useEffect, useState } from 'react';
import { getProfile } from '../services/auth';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const nav = useNavigate();
  const [user, setUser] = useState(null);
  const [err, setErr] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { nav('/login'); return; }
    getProfile(token).then(res => {
      if (res.user) setUser(res.user);
      else {
        setErr(res.message || 'Failed');
        localStorage.removeItem('token');
        nav('/login');
      }
    });
  }, []);

  function logout() {
    localStorage.removeItem('token');
    nav('/login');
  }

  if (!user) return <div className="container"><p>Loading...</p></div>;

  return (
    <div className="container">
      <header><h2>Welcome, {user.name}</h2></header>
      <p>Email: {user.email}</p>
      <p>Joined: {new Date(user.created_at).toLocaleString()}</p>
      <div style={{marginTop:16}}>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}
