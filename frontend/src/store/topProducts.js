import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

const topProductsSlice = createSlice({
    name: "topProducts",
    initialState: { loading: false, error: null, products: []},
    reducers: {
        topProductsRequest: (state) => {
            state.loading = true;
        },
        topProducutsSuccess: (state, action) => {
            state.loading = false;
            state.products = action.payload;
        },
        topProductsFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})

export const topProductsActions = topProductsSlice.actions;

export const listTopProducts = () => async(dispatch) => {
    try{

        dispatch(topProductsActions.topProductsRequest());

        const { data } = await axios.get("/api/products/top");

        dispatch(topProductsActions.topProducutsSuccess(data))

    } catch (error) {
        dispatch(topProductsActions.topProductsFailed(error.respone && error.respone.data.detail ? error.response.data.detail : error.message));
    }
}


export default topProductsSlice.reducer;