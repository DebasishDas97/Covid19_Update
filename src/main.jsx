import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {CovidDataProvider} from './context/contextApi'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <CovidDataProvider>
    <App />
  </CovidDataProvider>
  </React.StrictMode>,
)
