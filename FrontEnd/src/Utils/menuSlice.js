import { createSlice } from "@reduxjs/toolkit";

const menuSlice=createSlice({

    name:"menu",
    initialState:{
        isMenuOpen:false
    },
    reducers:{
        setMenuOpen:(state,action)=>{
             state.isMenuOpen=action.payload;
        }
    }

})

export const{setMenuOpen}=menuSlice.actions;
export default menuSlice.reducer;