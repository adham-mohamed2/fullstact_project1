import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Loading from "../componant/loading/Loading.jsx"
import { GlobalContext } from '../context/index'
import { Outlet } from 'react-router-dom';
import Cookies from "universal-cookie"
function PersistLoagin() {
    const {user , setUser} = useContext(GlobalContext);
    const [loading , setLoading]  = useState(true);
    const token = user.token;

    // get Cookies to add to function refresh token

    const cookie = new Cookies();
    const getToken = cookie.get("Bearer");


    // function Refresh token

    useEffect(()=>{
    async function RefreshToken(){
        try{
            await axios.post("http://127.0.0.1:8000/api/refresh"  , null ,  {
                headers:{
                    Authorization:"Bearer " + getToken,
                },
            })
            .then((res)=>{
                cookie.set("Bearer" , res.data.token)
                setUser({userDetails:res.data.user , token:res.data.token})
            })
        }catch(erro){
            console.log(erro)
        }finally{
            setLoading(false)
        }
    }

    !token ? RefreshToken() : setLoading(false);
},[])
    

    
  return (
    loading ? <Loading/> : <Outlet/>
  )
}

export default PersistLoagin