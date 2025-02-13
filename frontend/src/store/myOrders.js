import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

const myOrdersSlice = createSlice({
    name: "myOrders",
    initialState: { loading: false, orders: [], error: null},
    reducers: {
        myOrdersRequest: (state) => {
            state.loading = true;
        },
        myOrdersSuccess: (state, action) => {
            state.loading = false;
            state.orders = action.payload;
        },
        myOrdersFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        myOrdersReset: (state) => {
            state.loading = false;
            state.error = null;
            state.orders = [];
        }
    }
})

export const myOrdersActions = myOrdersSlice.actions;

export const listMyOrders= () => async(dispatch, getState) => {
    try {
        dispatch(myOrdersActions.myOrdersRequest());

        const config = {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${getState().user.userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/orders/myorders`, config);

        dispatch(myOrdersActions.myOrdersSuccess(data));
    } catch (error) {
        dispatch(myOrdersActions.myOrdersFail(error.respone && error.respone.data.detail ? error.response.data.detail : error.message));
    }
}

export default myOrdersSlice.reducer;