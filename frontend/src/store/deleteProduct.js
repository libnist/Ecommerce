import axios from "axios"
import { createSlice } from "@reduxjs/toolkit"

const deleteProductSlice = createSlice({
    name: "deleteProduct",
    initialState: {loading: false, success: null, error: null},
    reducers: {
        productDeleteRequset: (state) => {
            state.loading = true;
        },
        productDeleteSuccess: (state) => {
            state.loading = false;
            state.success = true;
        },
        productDeleteFail: (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.payload;
        },
        productDeleteReset: (state) => {
            state.loading = false;
            state.success = null;
            state.error = null;
        }
    }
})

export const deleteProductActions = deleteProductSlice.actions;

export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch(deleteProductActions.productDeleteRequset())
        const config = {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${getState().user.userInfo.token}`
            }
        }

        await axios.delete(`/api/products/delete/${id}`, config);

        dispatch(deleteProductActions.productDeleteSuccess())
    } catch (error) {
        dispatch(deleteProductActions.productDeleteFail(error.respone && error.respone.data.detail ? error.response.data.detail : error.message));
    }
}

export default deleteProductSlice.reducer;