import React from 'react'
import Topbar from "../../componant/slidbar/Topbar"
import Slidebar from "../../componant/slidbar/Slidebar"
import { Outlet} from 'react-router-dom'
function Dashbord() {
  return (
    <div className='dashbord'>
        <Topbar/>
        <div className="content d-flex">
          <div className="left-section-slidbar">
            <Slidebar/>
          </div>
          <div className="right-section w-100 p-3">
           <Outlet/>
          </div>
        </div>
        
    </div>
  )
}

export default Dashbord