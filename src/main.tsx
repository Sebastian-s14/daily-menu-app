import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import dayjs from 'dayjs'
import localeEs from 'dayjs/locale/es-mx'

import { AuthProvider } from './modules/auth/context'

// import { App } from './modules/app/components/App'
import { AppRouter } from './modules/router'
import { UserProvider } from './modules/users/context'
import { RecordProvider } from './modules/records/context'

import './index.css'

dayjs.locale(localeEs)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <UserProvider>
        <RecordProvider>
          <AppRouter />
        </RecordProvider>
      </UserProvider>
      <Toaster position="bottom-center" reverseOrder={false} />
    </AuthProvider>
  </React.StrictMode>,
)
