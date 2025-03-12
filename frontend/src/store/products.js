import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const productSlice = createSlice({
    name: "products",
    initialState: { products: [], loading: false, error: null},
    reducers: {
        productListRequest: (state) => {
            state.loading = true;
        },
        productListSuccess: (state, action) => {
            state.loading = false;
            state.products = action.payload;
        },
        productListFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})

export const productActions = productSlice.actions;

export const listProducts = (keyword) => {
    return async(dispatch) => {
        try {
            dispatch(productActions.productListRequest())

            const { data } = await axios.get(`/api/products?keyword=${keyword}`)

            dispatch(productActions.productListSuccess(data))

        } catch (error) {
            dispatch(productActions.productListFail(error.response && error.response.data.message ? error.response.data.message : error.message))
        }
    }
}


export default productSlice.reducer;