import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { lazy, Suspense, useContext, useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import './../firebase'
import { ProtectedRoute, PublicRoute } from './components'
import { AuthContext } from '../auth/context'

const MainLayoutMaterial = lazy(
  () => import('../shared/layouts/MainLayoutMaterial'),
)
const LoginPage = lazy(() => import('../auth/pages/LoginPage'))
const UsersPage = lazy(() => import('../users/pages/UsersPage'))
const UserDetail = lazy(() => import('../users/pages/UserDetail'))

export const AppRouter = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  // const auth = getAuth()
  // const user = auth.currentUser
  const { setAuthUser } = useContext(AuthContext)

  useEffect(() => {
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        console.log(user.email)
        const uid = user.uid
        console.log(uid)
        // ...
        console.log('logueadoooo')
        setIsAuthenticated(true)
        setIsLoading(false)
        setAuthUser({
          id: user.uid,
          name: user.displayName || 'no-name',
          email: user.email || 'email',
          photo: user.photoURL || '',
        })
      } else {
        // User is signed out
        // ...
        console.log('no logueado')
        setIsAuthenticated(false)
        setIsLoading(false)
      }
    })
  }, [setAuthUser])

  console.log({ isAuthenticated })

  if (isLoading) return <div>Loading validation...</div>

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <MainLayoutMaterial />
              </ProtectedRoute>
            }
          >
            <Route index element={<UsersPage />} />
            <Route path="user/:userId" element={<UserDetail />} />
            {/* <Route path="dashboard" element={<UsersPage />} /> */}
          </Route>
          <Route
            path="login"
            element={
              <PublicRoute isAuthenticated={isAuthenticated}>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  )
}
