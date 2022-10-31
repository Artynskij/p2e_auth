import { createReducer, createAction } from "@reduxjs/toolkit";
import { games } from "../../utils/mockData";

export type SearchItemType = typeof games[0]

const initialState = {
    value: '',
    items: games as SearchItemType[]
}

export const updateSearchValue = createAction<string>('search/updateSearchValue');

export const searchReducer = createReducer(initialState, builder => {
    builder.addCase(updateSearchValue, (state, action) => {
        let newValue = action.payload
        let copy = {...state, value: newValue}
        let newItems = games.filter(i => i.name.toLowerCase().includes(newValue.toLowerCase()))
        return {...copy, items: newItems}
    });
    builder.addDefaultCase(() => { });
});