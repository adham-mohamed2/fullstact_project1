import React, { useContext } from 'react'
import { GlobalContext } from '../context'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

function RequireAuth() {
    const {user} = useContext(GlobalContext)
    const location = useLocation();
  return (
    user.token ? <Outlet/> : <Navigate state={{from : location}} replace to="/auth/login"/>
  )
}

export default RequireAuth