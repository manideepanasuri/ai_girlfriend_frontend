import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const loginUser=createAsyncThunk(
  'login',
  async (userdetails) => {
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: import.meta.env.VITE_BACKEND_HOST+'api/token/',
      headers:{'Content-Type': 'application/json'},
      data : JSON.stringify(userdetails)
    };
    const response=await axios.request(config);
    let data=response.data;
    const decode=jwtDecode(data.access);
    localStorage.setItem('access',data.access)
    localStorage.setItem('refresh',data.refresh)
    data={...data,username:decode.username,email:decode.email};
    return data;
  }

)

export const createUser=createAsyncThunk(
  'sign up',
  async (userdetails)=>{
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: import.meta.env.VITE_BACKEND_HOST+'api/create/user/',
      headers:{'Content-Type': 'application/json'},
      data : JSON.stringify(userdetails)
    };
    const response=await axios.request(config);
    console.log(response)
    let data=response.data;
    const decode=jwtDecode(data.access);
    localStorage.setItem('access',data.access)
    localStorage.setItem('refresh',data.refresh)
    data={...data,username:decode.username,email:decode.email};
    return data;
  }
)

export const refresh=createAsyncThunk(
  'refresh',
  async ()=>{
    const refresh=localStorage.getItem('refresh');
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: import.meta.env.VITE_BACKEND_HOST+'api/token/refresh/',
      headers:{'Content-Type': 'application/json'},
      data : JSON.stringify({refresh})
    };
    const response=await axios.request(config);
    let data=response.data;
    const decode=jwtDecode(data.access);
    localStorage.setItem('access',data.access)
    localStorage.setItem('refresh',data.refresh)
    data={...data,username:decode.username,email:decode.email};
    return data;
  }
)


const user=createSlice({
  name:'user',
  initialState:{
    isLoading:false,
    username:null,
    email:null,
    access:null,
    refresh:null,
    error:null,
  },
  reducers:{
    logout:(state)=>{
      localStorage.clear()
      state.isLoading=false;
      state.username=null;
      state.email=null;
      state.access=null;
      state.refresh=null;
      state.error=null;
    }
  },
  extraReducers:(builder)=>{
    builder
    .addCase(loginUser.pending,(state)=>{
      state.isLoading=true;
      state.access=null;
      state.refresh=null;
      state.error=null;
    })
    .addCase(loginUser.fulfilled,(state,action)=>{
      state.isLoading=false;
      state.access=action.payload.access;
      state.refresh=action.payload.refresh;
      state.username=action.payload.username;
      state.email=action.payload.email;
      state.error=null;
      
      localStorage.setItem('access',action.payloadaccess)
      localStorage.setItem('refresh',action.payload.refresh)
    })
    .addCase(loginUser.rejected,(state,action)=>{
      state.isLoading=false;
      state.access=null;
      state.refresh=null;
      console.log(action);
      state.error=action.error;
    })
    //add case for sign up
    .addCase(createUser.fulfilled,(state,action)=>{
      state.isLoading=false;
      state.access=action.payload.access;
      state.refresh=action.payload.refresh;
      state.username=action.payload.username;
      state.email=action.payload.email;
      state.error=null;
      localStorage.setItem('access',action.payloadaccess)
      localStorage.setItem('refresh',action.payload.refresh)
    })
    .addCase(createUser.pending,(state)=>{
      state.isLoading=true;
      state.access=null;
      state.refresh=null;
      state.error=null;
    })
    .addCase(createUser.rejected,(state,action)=>{
      state.isLoading=false;
      state.access=null;
      state.refresh=null;
      console.log(action);
      state.error=action.error;
    })
    //add case for refresh
    .addCase(refresh.fulfilled,(state,action)=>{
      state.isLoading=false;
      state.access=action.payload.access;
      state.refresh=action.payload.refresh;
      state.username=action.payload.username;
      state.email=action.payload.email;
      state.error=null;
      localStorage.setItem('access',action.payloadaccess)
      localStorage.setItem('refresh',action.payload.refresh)
    })
    .addCase(refresh.pending,(state)=>{
      state.isLoading=true;
      state.access=null;
      state.refresh=null;
      state.error=null;
    })
    .addCase(refresh.rejected,(state,action)=>{
      state.isLoading=false;
      state.access=null;
      state.refresh=null;
      console.log(action);
      state.error=action.error;
    })
  },
})

export const {logout}=user.actions;

export default user.reducer;