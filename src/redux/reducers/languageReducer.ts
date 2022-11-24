import { createReducer, createAction } from "@reduxjs/toolkit";

export type DataLanguageType = {
    ln:string
  }


const initialState = {
    ln:"rus"
}

export const addLanguage = createAction<DataLanguageType>('user/language');

export const languageReducer = createReducer(initialState, builder => {
    builder.addCase(addLanguage, (state, action) => {
        let language = action.payload
        
        const {ln} = language
      
          return { ...state, ln:ln} 
    });
    builder.addDefaultCase(() => { });
});