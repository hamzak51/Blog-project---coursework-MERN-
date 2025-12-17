import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import PostPage from './pages/Post'
import Login from './pages/Login'
import Register from './pages/Register'
import AdminDashboard from './pages/AdminDashboard'
import PostEditor from './pages/PostEditor'
import { getCurrentUser } from './utils/auth'

function RequireAdmin({ children }) {
  const user = getCurrentUser()
  if (!user || user.role !== 'admin') return <Navigate to="/login" replace />
  return children
}

export default function App() {
  return (
    <div className="app-root">
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:slug" element={<PostPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<RequireAdmin><AdminDashboard /></RequireAdmin>} />
          <Route path="/admin/new" element={<RequireAdmin><PostEditor /></RequireAdmin>} />
          <Route path="/admin/edit/:id" element={<RequireAdmin><PostEditor /></RequireAdmin>} />
        </Routes>
      </main>
      <footer className="footer">© {new Date().getFullYear()} iYap</footer>
    </div>
  )
}