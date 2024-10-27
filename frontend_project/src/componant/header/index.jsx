import React from 'react'
import {Link} from "react-router-dom"
import axios from 'axios'
import Cookies from "universal-cookie"
function Header() {
    const cookie = new Cookies()
    const token = cookie.get("Bearer")
    async function handleLogOut(){
        try{
            await axios.post("http://127.0.0.1:8000/api/logout" , null , {
                headers:{
                    Authorization:"Bearer " + token,
                }
            }).then((res)=>{
                cookie.remove("Bearer")
                window.location.pathname="/"
            })
            
        }catch(error){
            console.log(error);
        }
    }
  return (
    <div className='main-header d-flex align-items-center' style={{height:"80px" , background:"whiteSmoke"}}>
        <div className="container d-flex align-items-center justify-content-between">
            <h1 className="brand-logo fs-3 fw-bold text-capitalize">Shoping</h1>
            {!token ? (
                <ul  style={{listStyle:"none"}} className='d-flex align-items-center gap-2'>
                    <li>
                        <Link style={{textDecoration:"none" , width:"150px"}} className='text-capitalize btn btn-md btn-primary' to="/auth/register">register</Link>
                    </li>
                    <li>
                        <Link style={{textDecoration:"none" , width:"150px"}} className='text-capitalize btn btn-md btn-primary' to="/auth/login">login</Link>
                    </li>
                 </ul>
            )
            :
            (
                <ul style={{listStyle:"none"}} className='d-flex align-items-center gap-2'>
                    <li>
                        <Link style={{textDecoration:"none" , width:"150px"}}  className='text-capitalize btn btn-md btn-primary' to="/dashbord">Dashbaord</Link>
                    </li>
                    <div onClick={handleLogOut} style={{textDecoration:"none" , width:"150px"}}  className='text-capitalize btn btn-md btn-primary'>Log Out</div>
                </ul>
            )
        }
        </div>
    </div>
  )
}

export default Header