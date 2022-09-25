import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './modules/auth/context'

// import { App } from './modules/app/components/App'
import { AppRouter } from './modules/router'
import { UserProvider } from './modules/users/context'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <UserProvider>
        <AppRouter />
      </UserProvider>
      <Toaster position="bottom-center" reverseOrder={false} />
    </AuthProvider>
  </React.StrictMode>,
)
