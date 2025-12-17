import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getCurrentUser, logout } from '../utils/auth'

export default function Navbar(){
  const user = getCurrentUser()
  const navigate = useNavigate()

  function doLogout(){
    logout()
    navigate('/')
    window.location.reload()
  }

  return (
    <header className="navbar">
      <Link to="/" className="brand">
        <div className="logo">Y</div>
        <div>
          <h1>iYap</h1>
          <div style={{fontSize:12,color:'white'}}>MERN Blog</div>
        </div>
      </Link>

      <div className="nav-actions">
        <Link to="/" style={{textDecoration:'none',color:'#FFFFFF'}}>Home</Link>
        {user && user.role === 'admin' && <Link to="/admin" style={{textDecoration:'none',color:'#FFFFFF'}}>Dashboard</Link>}
        {!user ? (
          <>
            <Link to="/login" className="btn">Login</Link>
            <Link to="/register" className="btn">Register</Link>
          </>
        ) : (
          <>
            <div style={{color:'#e7d7c1'}}>Hi, {user.role}</div>
            <button className="btn" onClick={doLogout}>Logout</button>
          </>
        )}
      </div>
    </header>
  )
}