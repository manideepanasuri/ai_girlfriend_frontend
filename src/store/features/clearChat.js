import { createSlice } from "@reduxjs/toolkit";

const clearchat=createSlice({
  name:'clearchat',
  initialState:{value:false},
  reducers:{
    setToTrue:(state)=>{
      state.value=true;
    },
    setToFalse:(state)=>{
      state.value=false
    }
  }
})

export const { setToTrue,setToFalse } = clearchat.actions;

export default clearchat.reducer;