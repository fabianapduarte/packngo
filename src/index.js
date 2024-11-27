import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'

import './index.css'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SnackbarProvider anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
        <App />
      </SnackbarProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
