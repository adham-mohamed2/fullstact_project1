import React, { useState , useContext } from 'react'
import axios from "axios"
import "./login.css"
import Header from "../../componant/header/index"
import { GlobalContext } from '../../context';
import Cookies from 'universal-cookie';
function Login() {

    // context store to store token

    const {setUser} = useContext(GlobalContext);

    // input state

    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [error , setError] = useState(false);

    // cookies libarary to store token 

    const cookie = new Cookies();


    async function Submit(e){
        e.preventDefault();
        try{
                // send data to database
                const data = {
                    email:email,
                    password:password,
                }
                await axios.post("http://127.0.0.1:8000/api/login" , data)
                .then((res)=>{
                        const token = res.data.data.token;
                        cookie.set("Bearer" , token);
                        const userDetails = res.data.data.user;
                        setUser({token , userDetails});
                        window.location.pathname = "/" 
                })
        }catch(error){
            if(error.response.status === 401){
                setError(true);
            }
        }
        
    }

    

  return (
    <div className='login-page'>
        <Header/>
        <div className='container signup'>
        <form onSubmit={Submit}>
            <div className='box'>
                <label htmlFor='email'>Email</label>
                <input onChange={(e)=>setEmail(e.target.value)} id="email" value={email} type="email"  placeholder='Email...' required/>
            </div>
            <div className='box'>
                <label htmlFor='password'>Password</label>
                <input onChange={(e)=>setPassword(e.target.value)} id="password" value={password} type="password" placeholder='Password...'/>
                {password.length < 8 && <span className='error'>password must be more then 8 char</span>}
            </div>
            <div className='text-center'>
                <button type="submit" style={{width:"150px"}} className='btn btn-md btn-primary text-capitalize'>Login</button>
            </div>

            {error && <span className='error'>Wromg Email And Password</span>}
        </form>
    </div>
    </div>
   
  )
}

export default Login