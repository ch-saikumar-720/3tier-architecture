import React, { useState } from 'react';
import { register } from '../services/auth';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setError('');
    if (form.password.length < 6) { setError('Password must be >= 6 chars'); return; }

    const res = await register(form);
    if (res.token) {
      localStorage.setItem('token', res.token);
      nav('/dashboard');
    } else {
      setError(res.message || (res.errors && res.errors[0].msg) || 'Registration failed');
    }
  }

  return (
    <div className="container">
      <header><h2>Create account</h2></header>
      <form onSubmit={submit}>
        <div className="field">
          <input required placeholder="Full name" value={form.name} onChange={e => setForm({...form,name:e.target.value})}/>
        </div>
        <div className="field">
          <input required type="email" placeholder="Email" value={form.email} onChange={e => setForm({...form,email:e.target.value})}/>
        </div>
        <div className="field">
          <input required type="password" placeholder="Password" value={form.password} onChange={e => setForm({...form,password:e.target.value})}/>
        </div>
        {error && <div style={{color:'red', marginBottom:10}}>{error}</div>}
        <div style={{display:'flex', gap:8}}>
          <button type="submit">Sign up</button>
        </div>
      </form>
    </div>
  );
}
