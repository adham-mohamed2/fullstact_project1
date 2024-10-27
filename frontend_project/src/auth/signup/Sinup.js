import Header from "../../componant/header/index"
import React, { useContext, useState } from 'react'
import axios from "axios"
import "./sign.css"
import { GlobalContext } from '../../context/index.js';
import {  useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

function Sinup() {

    
    // input state
    const [name , setName] = useState("");
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [confirmPassword , setConfirmPassword] = useState("");
    const [error , setError] = useState([]);
    
    // nav link to translate to another page
    const navigate = useNavigate()

    // context store to store token
    const {setUser} = useContext(GlobalContext);
    

    // cookies libarary to store token 
    const cookie = new Cookies();

    // set data user or update data user
    async function Submit(e){
        e.preventDefault();
        try{
                // send data to database
                const data = {
                    name:name,
                    email:email,
                    password:password,
                    password_confirmation:confirmPassword,
                }
                await axios.post(`http://127.0.0.1:8000/api/register` , data)
                .then((res)=>{
                        const token = res.data.data.token;
                        cookie.set("Bearer" , token);
                        const userDetails = res.data.data.user;
                        setUser({token , userDetails});
                        navigate(`/`)
                })
        
        }catch(error){
            console.log(error)
            setError(error.response.data.errors);
        }
        
    }
    
  return (
    <div className='signUp-page'>
        <Header/>
        <div className='container parent'>
        <form onSubmit={Submit}>
            <div className='box'>
                <label htmlFor='name'>Name</label>
                <input onChange={(e)=>setName(e.target.value)} id="name" value={name} type="text" placeholder='Name...'/>
                {error.name && <span className='error'>{error.name}</span>}
            </div>
            <div className='box'>
                <label htmlFor='email'>Email</label>
                <input onChange={(e)=>setEmail(e.target.value)} id="email" value={email} type="email"  placeholder='Email...' />
                {error.email && <span className='error'>{error.email}</span>}
            </div>
            <div className='box'>
                <label htmlFor='password'>Password</label>
                <input onChange={(e)=>setPassword(e.target.value)} id="password" value={password} type="password" placeholder='Password...'/>
                {error.password && <span className='error'>{error.password}</span>}
            </div>
            <div className='box'>
                <label htmlFor='confirm_password'>Confirm password</label>
                <input onChange={(e)=>setConfirmPassword(e.target.value)} id="confirm_password" value={confirmPassword} type="password" placeholder='Confirm password...'/>
                {password !== confirmPassword   && <span className='error'>password does not match</span>}
            </div>
            <div className='text-center'>
                <button type="submit" style={{width:"150px"}} className='btn btn-md btn-primary text-capitalize'>Register</button>
            </div>
    </form>
        </div>
    </div>
  )
}

export default Sinup