import axios from "axios";
import { createSlice } from "@reduxjs/toolkit"

const deliverOrderSlice = createSlice({
    name: "deliverOrder",
    initialState: { loading: false, error: null, success: null },
    reducers: {
        deliverOrderRequest: (state) => {
            state.loading = true;
        },
        deliverOrderSuccess: (state) => {
            state.loading = false;
            state.success = true;
        },
        delvierOrderFailed: (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.payload;
        },
        delvierOrderReset: (state) => {
            state.loading = false;
            state.success = null;
            state.error = null;
        }
    }
});

export const deliverOrderActions = deliverOrderSlice.actions;

export const deliverOrder = (id) => async (dispatch, getState) => {
    try {
        dispatch(deliverOrderActions.deliverOrderRequest());

        const config = {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${getState().user.userInfo.token}`
            }
        }

        await axios.put(`/api/orders/${id}/delivered`, {}, config)

        dispatch(deliverOrderActions.deliverOrderSuccess());
    } catch (error) {
        dispatch(deliverOrderActions.delvierOrderFailed(error.respone && error.respone.data.detail ? error.response.data.detail : error.message));

    }
}

export default deliverOrderSlice.reducer;