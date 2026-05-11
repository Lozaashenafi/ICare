import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './assets/main.css'
import { ThemeProvider } from './context/ThemeContext' // ADD THIS

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider> {/* WRAP HERE */}
      <App />
    </ThemeProvider>
  </React.StrictMode>
)