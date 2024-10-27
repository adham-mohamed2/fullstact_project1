import React from 'react'
import {  NavLink } from 'react-router-dom'
import "./slide.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers , faUserPlus , faPlus } from '@fortawesome/free-solid-svg-icons'
function Slidebar() {
  return (
    <div className='slidebar' style={{padding:"20px" , borderRight:"2px solid #ccc" , width:"250px" , height:"calc(100vh - 80px)"}}>
        <div className="content">
              <NavLink activeClassName="active"  style={{textDecoration:"none"}} className='button-div mb-3 d-block text-capitalize text-dark fs-5 fw-bold' to="/dashbord/users">
                <FontAwesomeIcon className='me-2' icon={faUsers} />users
              </NavLink>
              <NavLink activeClassName="active" style={{textDecoration:"none"}} className='button-div mb-3 d-block text-capitalize text-dark fs-5 fw-bold' to="/dashbord/user/create">
                <FontAwesomeIcon className='me-2' icon={faUserPlus} />New User
              </NavLink>
              <NavLink activeClassName="active" style={{textDecoration:"none"}} className='button-div mb-3 d-block text-capitalize text-dark fs-5 fw-bold' to="/dashbord/products">
                <FontAwesomeIcon className='me-2' icon={faUserPlus} /> Products
              </NavLink>
              <NavLink activeClassName="active" style={{textDecoration:"none"}} className='button-div d-block text-capitalize text-dark fs-5 fw-bold' to="/dashbord/product/create">
                <FontAwesomeIcon className='me-2' icon={faPlus} />Create Pro
              </NavLink>
        </div>
    </div>
  )
}

export default Slidebar