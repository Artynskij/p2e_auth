import { createReducer, createAction } from "@reduxjs/toolkit";

export type BreadcrumbsItemType = {
  name: string
  link: string | null
}

const initialState = {
  items: [] as BreadcrumbsItemType[]
}

export const addBreadcrumbsItem = createAction<BreadcrumbsItemType | BreadcrumbsItemType[]>('breadcrumbs/addItem');
export const deleteBreadcrumbItem = createAction<string | string[]>('breadcrumbs/deleteItem');

export const breadcrumbsReducer = createReducer(initialState, builder => {
  builder.addCase(addBreadcrumbsItem, (state, action) => {
    let newItems = action.payload
    if (Array.isArray(newItems)) {
      return { ...state, items: [...state.items, ...newItems] }
    } else {
      return { ...state, items: [...state.items, newItems] }
    }
  });
  builder.addCase(deleteBreadcrumbItem, (state, action) => {
    let newItems = state.items.filter(i => !action.payload.includes(i.name));
    return { ...state, items: newItems };
  });
  builder.addDefaultCase(() => { });
});