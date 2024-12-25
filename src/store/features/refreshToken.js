import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const refreshTokens=createAsyncThunk(
  'refresh tokens',
  async () => {
    const refresh_token=localStorage.getItem('refresh');
    if(!refresh){return;}
    const response=axios.post(import.meta.env.VITE_BACKEND_HOST+'api/token/refresh/',{refresh:refresh_token})
    const data=await response.json();
    console.log(data);
  }
)

const refresh=createSlice({
  name:'refresh'
})

export default refresh.reducer;