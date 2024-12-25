import { BrowserRouter, Routes, Route, useNavigate } from "react-router";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {refresh} from "./store/features/userdata"


function App() {
  useNavigate
  const dispatch=useDispatch();
  useEffect(()=>{
    if(localStorage.getItem('refresh')){
      dispatch(refresh());
    }
  },[])

  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
