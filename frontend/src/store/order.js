import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const orderSlice = createSlice({
    name: "order",
    initialState: { loading: false, success: false, error: null, order: {}},
    reducers: {
        orderCreateRequest: (state) => {
            state.loading = true;
        },
        orderCreateSuccess: (state, action) => {
            state.loading = false;
            state.success = true;
            state.order = action.payload;
        },
        orderCreateFail: (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.payload;
        },
        orderReset: (state) => {
            state.success = false;
            state.error = null;
            state.order = {};
        }
    }
});

export const orderActions = orderSlice.actions;

export const createOrder = (order) => async(dispatch, getState) => {
    try {
        dispatch(orderActions.orderCreateRequest());

        const config = {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${getState().user.userInfo.token}`
            }
        }

        const { data } = await axios.post("/api/orders/add", order, config);

        dispatch(orderActions.orderCreateSuccess(data));
    } catch (error) {
        dispatch(orderActions.orderCreateFail(error.respone && error.respone.data.detail ? error.response.data.detail : error.message));
    }
}

export default orderSlice.reducer;