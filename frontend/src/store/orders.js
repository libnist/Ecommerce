import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { orderActions } from "./order";

const ordersSlice = createSlice({
    name: "orders",
    initialState: { loading: false, error: null, orders: [] },
    reducers: {
        orderListRequest: (state) => {
            state.loading = true;
        },
        orderListSuccess: (state, action) => {
            state.loading = false;
            state.orders = action.payload;
        },
        orderListFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})

export const ordersActions = ordersSlice.actions;

export const listOrders = () => async (dispatch, getState) => {
    try {
        dispatch(ordersActions.orderListRequest())
        const config = {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${getState().user.userInfo.token}`
            }
        }
        const { data } = await axios.get("/api/orders/orders", config)
        dispatch(ordersActions.orderListSuccess(data))
    } catch (error) {
        dispatch(ordersActions.orderListFailed(error.respone && error.respone.data.detail ? error.response.data.detail : error.message))

    }
}

export default ordersSlice.reducer;