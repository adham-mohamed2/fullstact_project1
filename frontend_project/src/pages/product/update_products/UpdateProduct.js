import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"
import { GlobalContext } from '../../../context/index';
import {  useNavigate, useParams } from 'react-router-dom';

function UpdateProduct() {
    const [title , setTitle] = useState("");
    const [description , setDescription] = useState("");
    const [image , setImage] = useState("");
    const [accept , setAccept] = useState(false)
    const navigate = useNavigate()

    const {user} = useContext(GlobalContext);
    

    const {id} = useParams();

    async function GetProducts(){
        try{
            await axios.get(`http://127.0.0.1:8000/api/product/showbyid/${id}` , 
                {
                    headers :{
                        Accept: "application/json",
                        Authorization :"Bearer " + user.token,
                    },
                })
            .then((res)=>{
                setTitle(res.data[0].title);
                setDescription(res.data[0].description);
            })
        }catch(error){
            console.log(error)
        }
    }


    useEffect(()=>{
    GetProducts()
    },id)

    // set data user or update data user
    async function Submit(e){
        e.preventDefault();
        setAccept(true);
        try{
                // send data to database
                const formData = new FormData();
                formData.append("title" , title);
                formData.append("description" , description);
                formData.append("image" , image);
                await axios.post(`http://127.0.0.1:8000/api/product/update/${id}` , formData , {
                    headers:{
                        Accept:"application/json",
                        Authorization:"Bearer " + user.token,
                    }
                })
                .then((res)=>{
                    navigate(`/dashbord/products`);
                })
        
        }catch(error){
            console.log(error)
            setAccept(true)
        }
        
    }
    
  return (
    
        <div className='parent'>
          <form onSubmit={Submit}>
              <div className='box'>
                  <label htmlFor='title'>Title</label>
                  <input onChange={(e)=>setTitle(e.target.value)} id="title" value={title} type="text" placeholder='title...'/>
                  {title.length < 1 && accept && <span className='error'>Title must be more then 2 char</span>}
              </div>
              <div className='box'>
                  <label htmlFor='description'>Description</label>
                  <input onChange={(e)=>setDescription(e.target.value)} id="description" value={description} type="text" placeholder='description...'/>
                  {description.length < 1 && accept && <span className='error'>Description must be more then 2 char</span>}
              </div>
              <div className='box'>
                  <label htmlFor='image'>Image</label>
                  <input onChange={(e)=>setImage(e.target.files.item(0))} id="image"  type="file" placeholder='Image...'/>
              </div>
              <div className='text-center'>
                  <button type="submit" style={{width:"150px"}} className='btn btn-md btn-primary text-capitalize'>update Product</button>
              </div>
          </form>
        </div>
  )


}

export default UpdateProduct