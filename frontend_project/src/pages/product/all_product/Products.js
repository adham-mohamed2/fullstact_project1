import React, { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash , faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import {Link} from "react-router-dom"
import { GlobalContext } from '../../../context'
function Products() {

    const [products , setProducts] = useState([]);
    const [runUseEffect , setRunuseeffect] = useState(0); 

    const {user} = useContext(GlobalContext);
    const token = user.token;
    // fetch user from Api
    async function GetProducts(){
        try{
            await axios.get("http://127.0.0.1:8000/api/product/show" , 
                {
                    headers :{
                        Accept: "application/json",
                        Authorization :"Bearer " + token,
                    },
                })
            .then((res)=>{
                setProducts(res?.data);
            })
        }catch(error){
            console.log(error)
        }
    }

    

    const ShowProduct = products.map((item , index)=>(
        <tr key={index}>
            <td><img style={{width:"40px", height:"40px"}} src={item.image} alt="img not found" /></td>
            <td>{item.title}</td>
            <td>{item.description}</td>
            <td>
               
                <Link to={`${item.id}`}><FontAwesomeIcon  style={{cursor:"pointer",color:"#a0c8cf" , fontSize:"20px"}}  icon={faPenToSquare} /></Link>
                <FontAwesomeIcon onClick={()=>handleRemoveProduct(item.id)} style={{cursor:"pointer",color:"red" ,fontSize:"20px", marginLeft:"8px"}} icon={faTrash} />
            </td>
        </tr>
    ))
   
    // use function GetUsers
    useEffect(()=>{
        GetProducts()
    },[runUseEffect])
    

    // function remove User

    async function handleRemoveProduct(id){
        try{
            await axios.delete(`http://127.0.0.1:8000/api/product/delete/${id}` , {
                headers:{
                    Accept:"application/json",
                    Authorization:"Bearer " + token,
                }
            })
            .then((res)=>{
              if(res.status === 200){
                setRunuseeffect(prev=>prev + 1);
              } 
            })
            
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
                  <th>image</th>
                    <th>title</th>
                    <th>description</th>
                    <th>action</th>
                </tr>
            </thead>
            <tbody>
                {ShowProduct}
            </tbody>
        </table>
    </div>
  )
}

export default Products