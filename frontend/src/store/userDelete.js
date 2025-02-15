import axios from "axios"
import { createSlice } from "@reduxjs/toolkit"

const userDeleteSlice = createSlice({
    name: "userDelete",
    initialState: {loading: false, error: null, success: null},
    reducers: {
        userDeleteRequest: (state) => {
            state.loading = true;
            state.success = null;
        },
        userDeleteSuccess: (state) => {
            state.loading = false;
            state.success = true;
        },
        userDeleteFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = false;
        },
        userDeleteReset: (state) => {
            state.loading = false;
            state.error = null;
            state.success = null;
        }
    }
});

export const userDeleteActions = userDeleteSlice.actions;

export const deleteUser = (id) => async (dispatch, getState) => {
    try {
        dispatch(userDeleteActions.userDeleteRequest());

        const config = {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${getState().user.userInfo.token}`
            }
        }

        await axios.delete(`/api/users/delete/${id}`, config)

        dispatch(userDeleteActions.userDeleteSuccess());
    } catch (error) {
        dispatch(userDeleteActions.userDeleteFail(error.respone && error.respone.data.detail ? error.response.data.detail : error.message));
    }
}

export default userDeleteSlice.reducer;