import { jwtDecode } from "jwt-decode";

export function saveToken(token) {
  localStorage.setItem('token', token)
}

export function logout() {
  localStorage.removeItem('token')
}

export function getToken() {
  return localStorage.getItem('token')
}

export function getCurrentUser() {
  const t = getToken()
  if (!t) return null
  try {
    const decoded = jwtDecode(t)
    return { id: decoded.id, role: decoded.role }
  } catch {
    return null
  }
}