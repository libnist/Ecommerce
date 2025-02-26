import axios from "axios"

import { createSlice } from "@reduxjs/toolkit"

const productUpdateSlice = createSlice({
    name: "updateProduct",
    initialState: { loading: false, error: null, success: null, product: null},
    reducers: {
        updateProductRequest: (state) => {
            state.loading = true;
        },
        updateProductSuccess: (state, action) => {
            state.loading = false;
            state.product = action.payload;
            state.success = true;
        },
        updateProductFail: (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.payload;
        },
        updateProductReset: (state) => {
            state.loading = false;
            state.success = null;
            state.error = null;
            state.product = null;
        }
    }
});

export const productUpdateActions = productUpdateSlice.actions;

export const updateProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch(productUpdateActions.updateProductRequest());
        const config = {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${getState().user.userInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/products/update/${product._id}`, product, config)

        dispatch(productUpdateActions.updateProductSuccess(data));
    } catch (error) {
        dispatch(productUpdateActions.updateProductFail(error.respone && error.respone.data.detail ? error.response.data.detail : error.message));
    }
}

export default productUpdateSlice.reducer;