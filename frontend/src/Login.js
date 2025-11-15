import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
  const base = process.env.REACT_APP_API_BASE || '';

  const submit = async (e) => {
    e.preventDefault();
    setMsg('Logging in...');
    try{
      const r = await axios.post(`${base}/login`, { email, password });
      setMsg('Logged in: ' + r.data.email);
      setTimeout(()=> navigate('/'), 700);
    }catch(err){
      setMsg(err.response?.data?.message || err.message);
    }
  };

  return (
    <div style={{maxWidth:420}}>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div style={{marginBottom:8}}>
          <input required placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} style={{width:'100%',padding:8}}/>
        </div>
        <div style={{marginBottom:8}}>
          <input required type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} style={{width:'100%',padding:8}}/>
        </div>
        <button type="submit" style={{padding:'8px 12px'}}>Login</button>
      </form>
      <p style={{marginTop:12}}>{msg}</p>
    </div>
  );
}
