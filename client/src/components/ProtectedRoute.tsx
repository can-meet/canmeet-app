import { useAuthStore } from '@/store/authStore'
import { Navigate, Outlet } from 'react-router-dom'

export const ProtectedRoute = () => {
  const { currentUser } = useAuthStore()
  return currentUser ? <Outlet /> : <Navigate to='/login' />
}
