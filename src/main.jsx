import React from 'react'
import ReactDOM from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import '@fortawesome/fontawesome-free/css/all.min.css'
import RouterComponent from './configuration/routing'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterComponent/>
  </React.StrictMode>,
)
