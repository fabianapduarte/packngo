import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'

import { AuthProvider } from './context/AuthContext'
import { TripProvider } from './context/TripContext'
import { EventProvider } from './context/EventContext'
import { ListsProvider } from './context/ListsContext'
import './index.css'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SnackbarProvider anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
        <AuthProvider>
          <TripProvider>            
            <EventProvider>
              <ListsProvider>                                        
                <App />
              </ListsProvider>
            </EventProvider>
          </TripProvider>
        </AuthProvider>
      </SnackbarProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
