import React from "react";
import Sinup from "./auth/signup/Sinup";
import Login from "./auth/login/Login"
import Home from "./pages/home/Home.jsx"
import Dashbord from "./pages/dashbord/Dashbord.jsx"
import User from "./pages/user/show_users/User.jsx"
import SingleUser from "./pages/user/update_user/Single_User.jsx"
import CreateUser from "./pages/user/create_user/CreateUser.jsx"
import RequireAuth from "./auth/RequireAuth.js"
import PersistLoagin from "./auth/PersistLoagin.js"
import Products from "./pages/product/all_product/Products.js"
import CreateProduct from "./pages/product/create_product/CreateProduct.js"
import UpdateProduct from "./pages/product/update_products/UpdateProduct.js"
import {   Routes , Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
          <Route path="/auth/register" element={<Sinup/>}/>
          <Route path="/auth/login" element={<Login/>}/>
          <Route path="/" element={<Home/>}/>
          <Route element={<PersistLoagin/>}>
            <Route element={<RequireAuth/>}>
              <Route path="/dashbord" element={<Dashbord/>}>
                <Route exact path="users" element={<User/>} />
                <Route path="users/:id" element={<SingleUser/>}/>
                <Route path="user/create" element={<CreateUser/>}/>
                <Route path="Products" element={<Products/>}/>
                <Route path="Product/create" element={<CreateProduct/>}/>
                <Route path="Products/:id" element={<UpdateProduct/>}/>
              </Route>
            </Route>
          </Route>
          
      </Routes>
      
    </>
    
  );
}

export default App;
