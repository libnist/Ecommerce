import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const payOrderSlice = createSlice(
    {
        name: "pay",
        initialState: { loading: true, success: null , error: null},
        reducers: {
            orderPayRequest: (state) => {
                state.loading = true;
            },
            orderPaySuccess: (state) => {
                state.loading = false;
                state.success = true;
            },
            orderPayFail: (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload;
            }
        }
    }
)

export const payOrderActions = payOrderSlice.actions;

export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch(payOrderActions.orderPayRequest());

        const config = {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${getState().user.userInfo.token}`
            }
        }

        const { data } = await axios.post(`/api/orders/${id}/pay`, paymentResult, config);

        dispatch(payOrderActions.orderPayRequest(data));
    } catch (error) {
        dispatch(payOrderActions.orderPayFail(error.respone && error.respone.data.detail ? error.response.data.detail : error.message));
    }
}

export default payOrderSlice.reducer;