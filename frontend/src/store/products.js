import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const productSlice = createSlice({
    name: "products",
    initialState: { products: [], page: null, pages: null, loading: false, error: null},
    reducers: {
        productListRequest: (state) => {
            state.loading = true;
        },
        productListSuccess: (state, action) => {
            state.loading = false;
            state.products = action.payload.products;
            state.page = action.payload.page;
            state.pages = action.payload.pages;
        },
        productListFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})

export const productActions = productSlice.actions;

export const listProducts = (keyword, page) => {
    return async(dispatch) => {
        try {
            dispatch(productActions.productListRequest())

            const { data } = await axios.get(`/api/products?keyword=${keyword}&page=${page}`)

            dispatch(productActions.productListSuccess(data))

        } catch (error) {
            dispatch(productActions.productListFail(error.response && error.response.data.message ? error.response.data.message : error.message))
        }
    }
}


export default productSlice.reducer;