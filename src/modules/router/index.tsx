import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useContext, useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import './../firebase'
// import { App } from '../app'
import { LoginPage } from '../auth'
import { UsersPage } from '../users'
// import { Dashboard } from '../dashboard'
import { MainLayout } from '../shared/layouts'
import { ProtectedRoute, PublicRoute } from './components'
import { AuthContext } from '../auth/context'

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

  // useEffect(() => {
  //   if (user) {
  //     // setAuthUser({
  //     //   id: user?.uid,
  //     //   email: user?.email || '',
  //     //   name: user?.displayName || '',
  //     // })
  //     console.log('i have user')
  //   }
  // }, [user, setAuthUser])
  console.log({ isAuthenticated })

  if (isLoading) return <div>Loading...</div>

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<UsersPage />} />
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
  )
}
