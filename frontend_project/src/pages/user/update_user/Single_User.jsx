import axios from 'axios';
import React, { useEffect  , useContext , useState} from 'react'
import { useParams } from 'react-router-dom'
import "./singleUser.css"
import {  useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../../context/index';

function Single_User() {

    // useState
    const [name , setName] = useState("");
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [confirmPassword , setConfirmPassword] = useState("");
    const [error , setError] = useState([]);

    const {user} = useContext(GlobalContext);
    const token = user.token;
    // get id from pathname

    const {id} = useParams();

    // useParams() == window.location.pathname.split("/").slice(-1)[0]

    // function get single user

    async function GetSingleUser(){
        try{
            await axios.get(`http://127.0.0.1:8000/api/user/showbyid/${id}` , {
                headers:{
                    Accept:"application/json",
                    Authorization:"Bearer " + token,
                },
            })
            .then((res)=>{
                setName(res?.data[0]?.name)
                setEmail(res?.data[0]?.email);
            })
        }catch(error){
            console.log(error);
        }
    }

    // update user

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
                await axios.post(`http://127.0.0.1:8000/api/user/update/${id}` , data , {
                    headers:{
                        Accept:"application/json",
                        Authorization:"Bearer " + token,
                    },
                })
        
        }catch(error){
            console.log(error)
            setError(error.response.data.errors);
        }
        
    }

    // use to work function that do get single user

    useEffect(()=>{
        GetSingleUser();
    },[id]);
    
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
                <button type="submit" style={{width:"150px"}} className='btn btn-md btn-primary text-capitalize'> Update</button>
            </div>
          </form>
    </div>
  )
}

export default Single_User  