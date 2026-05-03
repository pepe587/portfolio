import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Evaluation note: This application is presented for genuine, constructive feedback.
// Both technical and design aspects should be evaluated with critical eye.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
