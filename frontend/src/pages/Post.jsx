import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../services/api'
import CommentList from '../components/CommentList'
import Recommended from '../components/Recommended'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getCurrentUser } from '../utils/auth'

export default function PostPage(){
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])

  useEffect(() => {
    if (!slug) return
    api.get(`/posts/${slug}`).then(r => {
      setPost(r.data)
      api.get(`/comments/${r.data._id}`).then(rr => setComments(rr.data)).catch(()=>{})
    }).catch(()=>{})
  }, [slug])

  async function toggleLike(){
    const user = getCurrentUser()
    if (!user) return alert('Please login to like')
    try {
      await api.post(`/posts/${post._id}/like`)
      const r = await api.get(`/posts/${slug}`)
      setPost(r.data)
    } catch (err) { alert(err.response?.data?.msg || 'Error') }
  }

  if (!post) return <div style={{textAlign:'center',padding:40}}>Loading...</div>

  const imgSrc = post.coverImage && (post.coverImage.startsWith('/') ? (import.meta.env.VITE_API_BASE || 'http://localhost:5000') + post.coverImage : post.coverImage)

  return (
    <div className="grid-3">
      <article className="card post-article">
        {imgSrc && <img src={imgSrc} alt={post.title} />}
        <h1 style={{marginTop:8}}>{post.title}</h1>
        <div className="meta">{new Date(post.createdAt).toLocaleString()}</div>
        <div className="post-content" style={{marginTop:12}}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content || ''}</ReactMarkdown>
        </div>

        <div className="actions">
          <button className="btn" onClick={toggleLike}>{post.likes?.length || 0} Like{(post.likes?.length || 0) !== 1 ? 's' : ''}</button>
          <div style={{color:'#6b7280'}}>{post.views || 0} views</div>
        </div>

        <CommentList postId={post._id} initial={comments} onCommentAdded={(c)=>setComments([c,...comments])} />
      </article>

      <aside>
        <Recommended postId={post._id} />
      </aside>
    </div>
  )
}