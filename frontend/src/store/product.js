import { createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const productSlice = createSlice({
    name: "product",
    initialState: { product: { reviews: []}, loading: false, error: null},
    reducers: {
        productDetailRequest: (state) => {
            state.loading = true;
        },
        productDetailSuccess: (state, action) => {
            state.loading = false;
            state.product = action.payload;
        },
        productDetailFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})

export const productActions = productSlice.actions;

export const listProductDetails = (id) => {
    return async(dispatch) => {
        try {
            dispatch(productActions.productDetailRequest())

            const { data } = await axios.get(`/api/products/${id}`)

            dispatch(productActions.productDetailSuccess(data))
        } catch (error) {

            dispatch(productActions.productDetailFail(
                error.response && error.response.data.message ? error.response.data.message : error.message
            ))
        }
    }
}

export default productSlice.reducer;