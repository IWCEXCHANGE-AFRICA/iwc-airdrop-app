import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = ({ allowedUserTypes }) => {
  const user = useSelector(state => state.user)

  if (!user) {
    // Redirect to login if no user is found in the store
    return <Navigate to='/' replace />
  }

  if (!allowedUserTypes.includes(user.user_type)) {
    // Redirect to an appropriate page if user_type is not allowed
    return <Navigate to='/unauthorized' replace />
  }

  // Render the child routes if the user is authenticated and authorized
  return <Outlet />
}

export default ProtectedRoute
