import React, { useEffect, useState } from 'react'
import api from '../services/api'
import { Link, useNavigate } from 'react-router-dom'

export default function AdminDashboard(){
  const [posts,setPosts] = useState([])
  const navigate = useNavigate()

  useEffect(()=> {
    api.get('/posts').then(r=>setPosts(r.data)).catch(()=>setPosts([]))
  },[])

  async function handleDelete(id){
    if(!confirm('Delete this post?')) return
    try {
      await api.delete(`/admin/posts/${id}`)
      setPosts(posts.filter(p=>p._id !== id))
    } catch (err) {
      alert(err.response?.data?.msg || 'Delete failed')
    }
  }

  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
        <h2>Admin Dashboard</h2>
        <Link to="/admin/new" className="btn">Create New</Link>
      </div>

      <div style={{display:'grid',gap:10}}>
        {posts.map(p=>(
          <div key={p._id} className="admin-row">
            <div>
              <div style={{fontWeight:600}}>{p.title}</div>
              <div className="meta">{p.excerpt || (p.content && p.content.slice(0,120)+'...')}</div>
            </div>
            <div style={{display:'flex',gap:8}}>
              <button className="btn secondary" onClick={()=>navigate(`/admin/edit/${p._id}`)}>Edit</button>
              <button className="btn" style={{background:'#ef4444'}} onClick={()=>handleDelete(p._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}