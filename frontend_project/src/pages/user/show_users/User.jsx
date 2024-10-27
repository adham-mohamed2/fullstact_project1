import React, { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash , faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import "./user.css"
import axios from 'axios'
import {Link} from "react-router-dom"
import { GlobalContext } from '../../../context'
function User() {

    const [users , setUsers] = useState([]);
    const [runUseEffect , setRunuseeffect] = useState(0); 

    const {user} = useContext(GlobalContext);
    const token = user.token;
    // fetch user from Api
    async function GetUsers(){
        try{
            await axios.get("http://127.0.0.1:8000/api/user/show" , 
                {
                    headers :{
                        Accept: "application/json",
                        Authorization :"Bearer " + token,
                    },
                })
            .then((res)=>{
                setUsers(res?.data);
            })
        }catch(error){
            console.log(error)
        }
    }

    

    const ShowUser = users.map((item , index)=>(
        <tr key={index}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>
               
                <Link to={`${item.id}`}><FontAwesomeIcon  style={{cursor:"pointer",color:"#a0c8cf" , fontSize:"20px"}}  icon={faPenToSquare} /></Link>
                <FontAwesomeIcon onClick={()=>handleRemoveUser(item.id)} style={{cursor:"pointer",color:"red" ,fontSize:"20px", marginLeft:"8px"}} icon={faTrash} />
            </td>
        </tr>
    ))
   
    // use function GetUsers
    useEffect(()=>{
        GetUsers()
    },[runUseEffect])
    

    // function remove User

    async function handleRemoveUser(id){
        try{
            await axios.delete(`http://127.0.0.1:8000/api/user/delete/${id}` , {
                headers:{
                    Accept:"application/json",
                    Authorization:"Bearer " + token,
                }
            })
            setRunuseeffect(prev=>prev + 1);
        }
        catch(error){
            console.log(error);
        }
    }


    // button Refresh Token

    

   
    
  return (
    <div>
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>User</th>
                    <th>Emial</th>
                    <th>action</th>
                </tr>
            </thead>
            <tbody>
                {ShowUser}
            </tbody>
        </table>
    </div>
  )
}

export default User