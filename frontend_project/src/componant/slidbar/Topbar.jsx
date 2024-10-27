import React from 'react'
import { Link } from 'react-router-dom'

function Topbar() {
  return (
    <div className="top-header d-flex align-items-center" style={{height:"80px" , boxShadow:"1px 1px 10px 1px #cbc9c9"}}>
        <div className='container d-flex align-items-center justify-content-between' >
        <h3 className="brand_header text-capitalize">store</h3>
        <Link style={{textDecoration:"none" , width:"150px"}} className='btn btn-primary btn-md' to="/" >Go to Web Site</Link>
    </div>
    </div>
  )
}

export default Topbar