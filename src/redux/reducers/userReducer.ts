import { createReducer, createAction } from "@reduxjs/toolkit";

export type DataUserType = {
    email: string
    username: string 
    isSeller:boolean
    id:number
  }


const initialState = {
    email: '',
    username:'',
    isSeller:false,
    id:0
}

export const addDataUser = createAction<DataUserType>('user/addDataUser');

export const userReducer = createReducer(initialState, builder => {
    builder.addCase(addDataUser, (state, action) => {
        let dataUser = action.payload
        const {email, username, isSeller, id} = dataUser
      
          return { ...state, email:email, username:username, isSeller:isSeller, id:id } 
    });
    builder.addDefaultCase(() => { });
});