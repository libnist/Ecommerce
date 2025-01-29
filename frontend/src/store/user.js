import { createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const userInfo = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : undefined

const userSlice = createSlice({
    name: "user",
    initialState: { loading: false, userInfo: userInfo, error: null },
    reducers: {
        loginRequest: (state) => {
            state.loading = true
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.userInfo = action.payload
            state.error = null
        },
        loginFail: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        logout: (state) => {
            state.userInfo = undefined
            localStorage.removeItem("userInfo")
        }
    }
})

export const userActions = userSlice.actions;

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch(userActions.loginRequest())

        const config = {
            headers: {
                "content-type": "application/json"
            }
        }

        const { data } = await axios.post("/api/user/login", {"username": email, "password": password}, config)

        dispatch(userActions.loginSuccess(data))

        localStorage.setItem("userInfo", JSON.stringify(data))

    } catch (error) {
        dispatch(userActions.loginFail(error.response && error.response.data.detail ? error.response.data.detail : error.message))
    }
}

export const register = (inputData) => async(dispatch) => {
    try {
        dispatch(userActions.loginRequest)

        const config = {
            headers: {
                "content-type": "application/json"
            }
        } 

        const { data } = await axios.post("/api/users/register", inputData, config)

        dispatch(userActions.loginSuccess(data))
        localStorage.setItem("userInfo", JSON.stringify(data))

    } catch (error) {
        dispatch(userActions.loginFail(error.response && error.response.data.detail ? error.response.data.detail : error.message))
    }
}

export const update = (inputData) => async (dispatch, getState) => {

    try {
        dispatch(userActions.loginRequest());

        const config = {
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer ${getState().user.userInfo.token}`
            }
        }

        const { data } = await axios.put("/api/users/profile/update", inputData, config);

        dispatch(userActions.loginSuccess(data));

        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch(userActions.loginFail(error.respone && error.respone.data.detail ? error.response.data.detail : error.message))
    }
}

export default userSlice.reducer;