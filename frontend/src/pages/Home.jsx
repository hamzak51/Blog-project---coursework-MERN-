import React, { useEffect, useState } from 'react'
import api from '../services/api'
import PostCard from '../components/PostCard'

export default function Home(){
  const [posts, setPosts] = useState([])

  useEffect(()=>{
    api.get('/posts').then(r => setPosts(r.data)).catch(()=>setPosts([]))
  },[])

  return (
    <div className="grid-3">
      <div>
        <div className="post-list">
          {posts.map(p => <PostCard key={p._id} post={p} />)}
          {posts.length === 0 && <div className="card">No posts yet.</div>}
        </div>
      </div>

      <aside>
        <div className="card" style={{background:'#e5e5e5'}}>
          <h3>About</h3>
          {/* <p style={{color:'#374151'}}>iYap — a simple blog built with the MERN stack.</p> */}
          <p>Developed by:</p>
          <p>Muhammad Hamza Khan & Eisha Saleem</p>
        </div>
        {/* <div className="card" style={{marginTop:16}}>
          <h3>Tags</h3>
          <div style={{display:'flex',gap:8,flexWrap:'wrap',marginTop:8}}>
            <span style={{background:'#eef2ff',padding:'6px 8px',borderRadius:6}}>Tech</span>
            <span style={{background:'#eef2ff',padding:'6px 8px',borderRadius:6}}>Life</span>
          </div>
        </div> */}
      </aside>
    </div>
  )
}