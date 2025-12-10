import React, { useEffect, useState } from 'react'
import api from '../services/api'
import { Link } from 'react-router-dom'

export default function Recommended({ postId }){
  const [list, setList] = useState([])

  useEffect(() => {
    if (!postId) return
    api.get(`/posts/${postId}/recommended`).then(r => setList(r.data)).catch(()=>setList([]))
  }, [postId])

  if (!list.length) return null

  return (
    <div className="card">
      <h4>Recommended</h4>
      <div style={{marginTop:10,display:'grid',gap:10}}>
        {list.map(p=>(
          <Link to={`/post/${p.slug}`} key={p._id} style={{textDecoration:'none',color:'#0f172a'}}>
            <div style={{fontWeight:600}}>{p.title}</div>
            <div style={{fontSize:12,color:'#6b7280'}}>{new Date(p.createdAt).toLocaleDateString()}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}