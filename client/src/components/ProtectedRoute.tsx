import { Navigate } from 'react-router-dom'
import {ReactNode} from 'react'
interface ProtectedRouteProps {
  login: boolean;
  children: ReactNode;
}
const ProtectedRoute = ({ login, children }:ProtectedRouteProps) => {
  if (!login) return <Navigate to="/login" />
  return children
}

export default ProtectedRoute