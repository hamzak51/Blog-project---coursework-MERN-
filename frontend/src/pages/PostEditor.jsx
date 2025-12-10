import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../services/api'

export default function PostEditor(){
  const { id } = useParams()
  const navigate = useNavigate()
  const [title,setTitle]=useState('')
  const [content,setContent]=useState('')
  const [category,setCategory]=useState('')
  const [tags,setTags]=useState('')
  const [cover,setCover]=useState(null)
  const [loading,setLoading]=useState(false)

  useEffect(()=>{
    if(!id) return
    api.get('/posts').then(res=>{
      const p = res.data.find(x=>x._id === id)
      if(p){ setTitle(p.title); setContent(p.content); setCategory(p.category||''); setTags((p.tags||[]).join(', ')) }
    }).catch(()=>{})
  },[id])

  async function submit(e){
    e.preventDefault()
    setLoading(true)
    try {
      const form = new FormData()
      form.append('title',title)
      form.append('content',content)
      form.append('category',category)
      form.append('tags',tags)
      if(cover) form.append('coverImage',cover)

      if(id) await api.put(`/admin/posts/${id}`, form, { headers: { 'Content-Type': 'multipart/form-data' } })
      else await api.post('/admin/posts', form, { headers: { 'Content-Type': 'multipart/form-data' } })
      navigate('/admin')
    } catch (err) {
      alert(err.response?.data?.msg || 'Save failed')
    } finally { setLoading(false) }
  }

  return (
    <div className="card" style={{maxWidth:900,margin:'0 auto'}}>
      <h2>{id ? 'Edit Post' : 'Create Post'}</h2>
      <form onSubmit={submit}>
        <div className="form-row"><input className="input" value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" required/></div>
        <div className="form-row"><input className="input" value={category} onChange={e=>setCategory(e.target.value)} placeholder="Category"/></div>
        <div className="form-row"><input className="input" value={tags} onChange={e=>setTags(e.target.value)} placeholder="Tags (comma separated)"/></div>
        <div className="form-row"><textarea className="input" rows="10" value={content} onChange={e=>setContent(e.target.value)} placeholder="Content (Markdown allowed)"/></div>
        <div className="form-row"><input type="file" onChange={e=>setCover(e.target.files[0])} /></div>
        <div style={{display:'flex',gap:8}}>
          <button className="btn" type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
          <button type="button" className="btn secondary" onClick={()=>navigate('/admin')}>Cancel</button>
        </div>
      </form>
    </div>
  )
}