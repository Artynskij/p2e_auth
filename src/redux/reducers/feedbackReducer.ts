import { createAction, createReducer } from "@reduxjs/toolkit";
import { ApiService } from "../../api/ApiService";
import { Feedback } from "../../models/feedback";

const apiService = new ApiService();

const initialState: Feedback = {
  name: null,
  email: null,
  phone_number: null,
  text_of_feedback: null
};

export const addFeedback = createAction<Feedback | Feedback[]>("feedback/addFeedback");
export const getFeedback = createAction<Feedback | Feedback[]>("feedback/getFeedback");

export const feedBackReducer = createReducer(initialState, (builder) => {
  builder.addCase(addFeedback, (state, action) => {
    apiService.saveFeedback(action.payload);
  });

  builder.addCase(getFeedback, (state, action) => {
    const items = apiService.getFeedbacks();
    return { ...state, items: items };
  });
});