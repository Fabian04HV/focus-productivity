import React from "react"
import { Link } from 'react-router-dom'

export const LandingPage = () => {
  return (
  <main>
    <img height={16} src="./public/logo/big-focus-logo-white-transparent-no-padding.png" alt="Focus Productivity" />
    <h1>Focus Productivity</h1>
    <Link to={'/signup'}>Signup</Link>
    <Link to={'/login'}>Login</Link>
  </main>
  )
}