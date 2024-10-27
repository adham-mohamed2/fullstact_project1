
import React, { useContext, useState } from 'react'
import axios from "axios"
import "../../../auth/signup/sign.css"
import { GlobalContext } from '../../../context/index';
import {  useNavigate } from 'react-router-dom';

function CreateUser() {
  const [name , setName] = useState("");
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [confirmPassword , setConfirmPassword] = useState("");
    const [error , setError] = useState([]);

    const navigate = useNavigate()
    const {user} = useContext(GlobalContext);
    
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
                await axios.post(`http://127.0.0.1:8000/api/user/create` , data , {
                    headers:{
                        Accept:"application/json",
                        Authorization:"Bearer " + user.token,
                    }
                })
                .then((res)=>{
                    navigate(`/dashbord/users`)
                })
        
        }catch(error){
            console.log(error)
            setError(error.response.data.errors);
        }
        
    }
    
  return (
    
        <div className='parent'>
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
                  <button type="submit" style={{width:"150px"}} className='btn btn-md btn-primary text-capitalize'>Create User</button>
              </div>
          </form>
        </div>
  )
}

export default CreateUser
