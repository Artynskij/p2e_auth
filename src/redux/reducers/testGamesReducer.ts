import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { ApiService } from "../../api/ApiService"

export type GamesType = {
    id: number,
    title: string,
    description: string,
    image_of_game: string
}

const initialState = {
    gamesTest: []
}
export const getGamesTest = createAsyncThunk<any, undefined, { rejectValue: string }>(
    "gamesTest/getGamesTest",
    async (_, { rejectWithValue: string, dispatch }) => {
        const api = new ApiService()
        const data = await api.getGames()


        dispatch(setGamesTest(data))
    }
)

export const gamesTestSlice = createSlice({
    name: "gamesTest",
    initialState,
    reducers: {
        setGamesTest: (state, action) => {

            state.gamesTest = action.payload
        }
    },
    extraReducers: {
        [getGamesTest.fulfilled.toString()]: (state) => { console.log("fulfilled") },
        [getGamesTest.pending.toString()]: () => { console.log("pending") },
        [getGamesTest.rejected.toString()]: () => { console.log("rejected") },

    }

})

export const { setGamesTest } = gamesTestSlice.actions
export default gamesTestSlice