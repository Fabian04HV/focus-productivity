import React, { useContext } from 'react'
import { AuthContext } from '../context/auth.context'

const DashboardPage = () => {

  const { user } = useContext(AuthContext)

  return (
    <main>
      <h1>{user.firstname}s Dashboard</h1>
    </main>
  )
}

export default DashboardPage  