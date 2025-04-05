import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import React, { act } from 'react'

export const fetchPnrs = createAsyncThunk('pnr/fetchPnrs',async() => {

 await  axios.get('/sanctum/csrf-cookie'); //csrf-cookie -token
const response =await axios.get('/api/get/pnrs');
return response.data.pnrs;

});
 
export const addPnr = createAsyncThunk('pnr/addPnr',async(newPnr)=>{
    await  axios.get('/sanctum/csrf-cookie'); //csrf-cookie -token
    const response =await axios.post('/api/add/pnr',newPnr);
    return response.data.pnr; // Assuming the backend returns the newly created PNR
})



const PnrSlice = createSlice({
    name:'pnr',
    initialState:{
        data:[],
        status:'idle',
        error:null,

    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(addPnr.fulfilled,(state,action)=>{
            state.data.push(action.payload);
        })
        .addCase(fetchPnrs.pending,(state)=>{
            state.status='loading';
        })
        .addCase(fetchPnrs.fulfilled,(state,action)=>{
            state.status="succeeded";
            state.data=action.payload;
        })
        .addCase(fetchPnrs.rejected,(state,action)=>{
            state.status="failed";
            state.error=action.error.message;
        });

    },
});

export default PnrSlice.reducer;