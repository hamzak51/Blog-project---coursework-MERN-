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
        <div className="logo">BS</div>
        <div>
          <h1>BlogSphere</h1>
          <div style={{fontSize:12,color:'#6b7280'}}>MERN Blog</div>
        </div>
      </Link>

      <div className="nav-actions">
        <Link to="/" style={{textDecoration:'none',color:'#374151'}}>Home</Link>
        {user && user.role === 'admin' && <Link to="/admin" style={{textDecoration:'none',color:'#374151'}}>Dashboard</Link>}
        {!user ? (
          <>
            <Link to="/login" className="btn secondary">Login</Link>
            <Link to="/register" className="btn">Register</Link>
          </>
        ) : (
          <>
            <div style={{color:'#374151'}}>Hi, {user.role}</div>
            <button className="btn" onClick={doLogout}>Logout</button>
          </>
        )}
      </div>
    </header>
  )
}