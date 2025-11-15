import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Home from './Home';

function App(){
  return (
    <div style={{fontFamily:'sans-serif'}}>
      <nav style={{padding:10, borderBottom:'1px solid #ddd'}}>
        <Link to="/" style={{marginRight:10}}>Home</Link>
        <Link to="/signup" style={{marginRight:10}}>Signup</Link>
        <Link to="/login">Login</Link>
      </nav>

      <div style={{padding:20}}>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
