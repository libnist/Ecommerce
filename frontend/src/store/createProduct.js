import axios from "axios";

import { createSlice } from "@reduxjs/toolkit";

const createProductSlice = createSlice({
    name: "createProduct",
    initialState: { loading: false, error: null, success: null, product: null},
    reducers: {
        createProductRequest: (state) => {
            state.loading = true;
        },
        createProductSuccess: (state, action) => {
            state.loading = false;
            state.product = action.payload;
            state.success = true;
        },
        createProductFail: (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.payload;
        },
        createProductReset: (state) => {
            state.loading = false;
            state.success = null;
            state.error = null;
            state.product = null;
        }
    }
});

export const createProductActions = createProductSlice.actions;

export const createProduct = () => async (dispatch, getState) => {
    try {
        dispatch(createProductActions.createProductRequest());
        const config = {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${getState().user.userInfo.token}`
            }
        }

        const { data } = await axios.post("/api/products/create", {}, config)

        dispatch(createProductActions.createProductSuccess(data));
    } catch (error) {
        dispatch(createProductActions.createProductFail(error.respone && error.respone.data.detail ? error.response.data.detail : error.message));
    }
}

export default createProductSlice.reducer;