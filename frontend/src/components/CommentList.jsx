import React, { useState } from 'react'
import api from '../services/api'
import { getCurrentUser } from '../utils/auth'

export default function CommentList({ postId, initial = [], onCommentAdded }){
  const [comments, setComments] = useState(initial)
  const [body, setBody] = useState('')

  async function submit(e){
    e.preventDefault()
    const user = getCurrentUser()
    if (!user) return alert('Please login to comment')
    try {
      const res = await api.post('/comments', { postId, body })
      setComments([res.data, ...comments])
      setBody('')
      onCommentAdded?.(res.data)
    } catch (err) {
      alert(err.response?.data?.msg || 'Failed')
    }
  }

  return (
    <div style={{marginTop:18}}>
      <h3>Comments ({comments.length})</h3>
      <form onSubmit={submit} style={{marginTop:8}}>
        <textarea className="input" rows="3" value={body} onChange={e=>setBody(e.target.value)} placeholder="Write a comment..." required />
        <div style={{textAlign:'right',marginTop:8}}>
          <button className="btn" type="submit">Post Comment</button>
        </div>
      </form>

      <div style={{marginTop:12}}>
        {comments.map(c=>(
          <div key={c._id} className="comment">
            <div className="meta">{c.author?.name || 'User'} • {new Date(c.createdAt).toLocaleString()}</div>
            <div style={{marginTop:6}}>{c.body}</div>
          </div>
        ))}
      </div>
    </div>
  )
}