import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import { saveToken } from '../utils/auth'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  async function submit(e){
    e.preventDefault()
    try {
      const res = await api.post('/auth/login', { email, password })
      saveToken(res.data.token)
      navigate('/')
      window.location.reload()
    } catch (err) {
      alert(err.response?.data?.msg || 'Login failed')
    }
  }

  return (
    <div className="card" style={{maxWidth:520,margin:'0 auto'}}>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div className="form-row"><input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required/></div>
        <div className="form-row"><input className="input" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required/></div>
        <div style={{textAlign:'right'}}><button className="btn" type="submit">Login</button></div>
      </form>
    </div>
  )
}