import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { RootState } from "./store";

const selectSelf = (state: RootState) => state;

//breadcrumbs reducer
export const selectBreadcrumbItems = createDraftSafeSelector(selectSelf, state => state.breadcrumbs.items);

//search reducer
export const selectSearchItems = createDraftSafeSelector(selectSelf, state => state.search.items);
export const selectSearchValue = createDraftSafeSelector(selectSelf, state => state.search.value);

//user reducer
export const selectDataUser = createDraftSafeSelector(selectSelf, state => state.user);

export const selectGames = createDraftSafeSelector(selectSelf, state => state.games.games);
export const selectTestGames = createDraftSafeSelector(selectSelf, state => state.gamesTest.gamesTest);


