import axios from "axios"

import { createSlice } from "@reduxjs/toolkit";

const userUpdateSlice = createSlice({
    name: "userUpdate",
    initialState: { loading: false, user: {}, success: null, error: null},
    reducers: {
        userUpdateRequest: (state) => {
            state.loading = true;
            state.success = null;
        },
        userUpdateSuccess: (state, action) => {
            state.loading = false;
            state.success = true;
            state.user = action.payload;
        },
        userUpdateFail: (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.payload;
        },
        userUpdateReset: (state) => {
            state.loading = false;
            state.success = null;
            state.error = null;
            state.user = {};
        }
    }
});

export const userUpdateActions = userUpdateSlice.actions;

export const updateUser = (userId, user) => async (dispatch, getState) => {
    try{
        dispatch(userUpdateActions.userUpdateRequest());

        const config = {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${getState().user.userInfo.token}`
            }
        }

        const {data} = await axios.put(`/api/users/update/${userId}`, user, config);

        dispatch(userUpdateActions.userUpdateSuccess(data));
    } catch (error) {
        dispatch(userUpdateActions.userUpdateFail(error.respone && error.respone.data.detail ? error.response.data.detail : error.message));
    }
}

export default userUpdateSlice.reducer;