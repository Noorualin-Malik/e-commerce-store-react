import { useState } from 'react'
import './App.css'
import Dashboard from './Dashboard/Dashboard';
import Signup from './Pages/Signup';
import Login from './Pages/Login'
import {Route, Routes } from "react-router-dom";
import Layout from './layout/Layout'
import Product from './Pages/Product';
import Home from './Pages/Home';
import User from './Pages/User';
import Cart from './Pages/Cart';
import FavoritesPage from './Pages/FavouritesPage';



function App() {

  return (
    <>
<Routes>
    <Route path='/' element={<Home/>} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/favorites" element={<FavoritesPage />} />

     <Route path='/dashboard' element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path='product' element={<Product />} />
          <Route path="users" element={<User/>} />
      </Route>

  <Route path='/login' element={<Login />} />
  <Route path='/signup' element={<Signup />} />

</Routes>
    </>
  )
}

export default App
