import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { App } from './modules/app/components/App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
