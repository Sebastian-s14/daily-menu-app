import { Navigate, useLocation } from 'react-router-dom'

type PublicRouteProps = {
  isAuthenticated: boolean
  children: JSX.Element
}

interface stateType {
  from: { pathname: string }
}

export const PublicRoute = ({
  children,
  isAuthenticated,
}: PublicRouteProps) => {
  const location = useLocation()
  const myState = location.state as stateType
  const from = myState?.from?.pathname || '/'

  if (isAuthenticated) return <Navigate to={from} replace={true} />

  return children
}
