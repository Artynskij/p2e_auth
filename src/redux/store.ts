import { configureStore } from '@reduxjs/toolkit'
import { breadcrumbsReducer } from './reducers/breadcrumbsReducer'
import { feedBackReducer } from './reducers/feedbackReducer'
import  {gamesReducer}  from './reducers/gamesReducer'
import { searchReducer } from './reducers/searchReducer'
import { userReducer } from './reducers/userReducer'
import { gamesTestSlice } from "./reducers/testGamesReducer"

export const store = configureStore({
  reducer: {
    breadcrumbs: breadcrumbsReducer,
    search: searchReducer,
    feedBack: feedBackReducer,
    user:userReducer,
    games:gamesReducer,
    gamesTest: gamesTestSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch