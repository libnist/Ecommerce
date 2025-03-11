import axios from "axios";

import { createSlice } from "@reduxjs/toolkit";

const createReviewSlice = createSlice({
    name: "createReview",
    initialState: { loading: false, error: null, success: null },
    reducers: {
        createReviewRequest: (state) => {
            state.loading = true;
        },
        createReviewSuccess: (state) => {
            state.loading = false;
            state.success = true;
        },
        createReviewFail: (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.payload;
        },
        createReviewReset: (state) => {
            state.loading = false;
            state.success = null;
            state.error = null;
        }
    }
})

export const createReviewActions = createReviewSlice.actions;

export const createReview = (productId, review) => async (dispatch, getState) => {
    try {
        dispatch(createReviewActions.createReviewRequest())

        const config = {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${getState().user.userInfo.token}`
            }
        }

        await axios.post(`/api/products/${productId}/reviews`, review, config)

        dispatch(createReviewActions.createReviewSuccess())
    } catch (error) {
        dispatch(createReviewActions.createReviewFail(error.respone && error.respone.data.detail ? error.response.data.detail : error.message))
    }
}

export default createReviewSlice.reducer;