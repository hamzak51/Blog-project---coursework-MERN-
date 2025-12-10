import React, { useState } from 'react'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'

export default function Register(){
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const navigate = useNavigate()

  async function submit(e){
    e.preventDefault()
    try {
      await api.post('/auth/register',{ name,email,password })
      alert('Registered — please login')
      navigate('/login')
    } catch (err) {
      alert(err.response?.data?.msg || 'Registration failed')
    }
  }

  return (
    <div className="card" style={{maxWidth:520,margin:'0 auto'}}>
      <h2>Create account</h2>
      <form onSubmit={submit}>
        <div className="form-row"><input className="input" placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} required/></div>
        <div className="form-row"><input className="input" placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} required/></div>
        <div className="form-row"><input className="input" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required/></div>
        <div style={{textAlign:'right'}}><button className="btn" type="submit">Register</button></div>
      </form>
    </div>
  )
}