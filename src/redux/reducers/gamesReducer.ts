import { createReducer, createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiService } from "../../api/ApiService";

export type GamesType = {
    id:number,
    title:string,
    description:string,
    image_of_game:string
}



const initialState:any = {
    games:[]
}

export const getGames = createAction<GamesType>('games/getGames');

export const gamesReducer = createReducer(initialState, builder => {
    builder.addCase(getGames, (state, action) => {
        let games = action.payload
        
      
          return { ...state, games } 
    });
    builder.addDefaultCase(() => { });
});