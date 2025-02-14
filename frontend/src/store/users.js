import axios from "axios";

import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
    name: "users",
    initialState: {loading: false , users: [], error: null},
    reducers: {
        usersRequest: (state) => {
            state.loading = true;
        },
        usersSuccess: (state, action) => {
            state.loading = false;
            state.users = action.payload;
        },
        usersFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        usersReset: (state) => {
            state.loading = false;
            state.users = [];
            state.error = null;
        }
    }
});

export const usersActions = usersSlice.actions;

export const listUsers = () => async(dispatch, getState) => {
    try{
        dispatch(usersActions.usersRequest());

        const config = {
            headers: {
                "content-type": "applicatoin/json",
                Authorization: `Bearer ${getState().user.userInfo.token}`
            }
        }

        const { data } = await axios.get("/api/users", config);

        dispatch(usersActions.usersSuccess(data))
    } catch (error){
        dispatch(usersActions.usersFail(error.respone && error.respone.data.detail ? error.response.data.detail : error.message))
    }
}

export default usersSlice.reducer;