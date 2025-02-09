import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const orderDetailsSlice = createSlice({
    name: "orderDetails",
    initialState: { loading: false, order: {}, error: null},
    reducers: {
        orderDetailsRequest: (state) => {
            state.loading = true;
        },
        orderDetailsSuccess: (state, action) => {
            state.loading = false;
            state.order = action.payload;
        },
        orderDetailsFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        } 
    }
})

export const orderDetailsActions = orderDetailsSlice.actions;

export const getOrderDetails = (id) => async(dispatch, getState) => {
    try {
        dispatch(orderDetailsActions.orderDetailsRequest());

        const config = {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${getState().user.userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/orders/${id}`, config);

        dispatch(orderDetailsActions.orderDetailsSuccess(data));
    } catch (error) {
        dispatch(orderDetailsActions.orderDetailsFailed(error.respone && error.respone.data.detail ? error.response.data.detail : error.message));
    }
}

export default orderDetailsSlice.reducer;