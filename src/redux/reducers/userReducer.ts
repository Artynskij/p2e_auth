import { createReducer, createAction } from "@reduxjs/toolkit";

export type DataUserType = {
    email: string
    username: string 
  }


const initialState = {
    email: '',
    username:''
}

export const addDataUser = createAction<DataUserType>('user/addDataUser');

export const userReducer = createReducer(initialState, builder => {
    builder.addCase(addDataUser, (state, action) => {
        console.log(action.payload);
        
        let dataUser = action.payload
        const {email, username} = action.payload
       
          return { ...state, email:email, username:username }
        
        
        
    });
    builder.addDefaultCase(() => { });
});