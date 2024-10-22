import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { BrowserRouter as Router } from "react-router-dom"
import { AuthProviderWrapper } from "./context/auth.context"

const root = document.getElementById("root")
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Router>
      <AuthProviderWrapper>
        <App/>  
      </AuthProviderWrapper>
    </Router>
  </React.StrictMode>
)
