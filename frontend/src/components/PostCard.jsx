import React from 'react'
import { Link } from 'react-router-dom'

export default function PostCard({ post }){
  const imgSrc = post.coverImage && (post.coverImage.startsWith('/') ? (import.meta.env.VITE_API_BASE || 'http://localhost:5000') + post.coverImage : post.coverImage)
  return (
    <article className="post-card card post-card">
      {imgSrc && <img src={imgSrc} alt={post.title} />}
      <h2><Link to={`/post/${post.slug}`} style={{textDecoration:'none',color:'#0f172a'}}>{post.title}</Link></h2>
      <div className="meta">{new Date(post.createdAt).toLocaleDateString()} • {post.views || 0} views</div>
      <p style={{marginTop:10,color:'#374151'}}>{post.excerpt || (post.content && post.content.slice(0,160) + '...')}</p>
    </article>
  )
}