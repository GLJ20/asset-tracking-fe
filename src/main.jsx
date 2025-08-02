import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './i18n'

createRoot(document.querySelector('#root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>)