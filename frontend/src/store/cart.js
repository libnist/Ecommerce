import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const cartItemsFromStorage = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : []
const shippingAddress = localStorage.getItem("shippingAddress") ? JSON.parse(localStorage.getItem("shippingAddress")) : {};
const paymentMethod = localStorage.getItem("paymentMethod") ? JSON.parse(localStorage.getItem("paymentMethod")) : "";

const cartSlice = createSlice({
    name: "cart",
    initialState: { cartItems: cartItemsFromStorage, shippingAddress, paymentMethod},
    reducers: {
        cartAddItem: (state, action) => {
            const item = action.payload;
            const existItem = state.cartItems.find((x) => x.product === item.product)

            if (existItem) {
                state.cartItems = state.cartItems.map(x => x.product === existItem.product ? item : x)

            } else {
                state.cartItems.push(item)

            }
        },
        cartRemoveItem: (state, action) => {
            state.cartItems = state.cartItems.filter(x => x.product != action.payload);
        },
        cartSaveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;
        },
        cartSavePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
        },
        cartClearItems: (state) => {
            state.cartItems = [];
            localStorage.removeItem("cartItems");
        }
    }
})

export const cartActions = cartSlice.actions;

export const addToCartAction = (id, qty) => async (dispatch, getState) => {

    const { data } = await axios.get(`/api/products/${id}`)

    dispatch(cartActions.cartAddItem({
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty
    }))

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))

}

export const removeFromCart = (id) => async (dispatch, getState) => {
    dispatch(cartActions.cartRemoveItem(id))
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (data) => (dispatch) => {
    dispatch(cartActions.cartSaveShippingAddress(data));
    localStorage.setItem("shippingAddress", JSON.stringify(data));
}

export const savePaymentMethod = (data) => (dispatch) => {
    dispatch(cartActions.cartSavePaymentMethod(data));
    localStorage.setItem("paymentMethod", JSON.stringify(data));
}


export default cartSlice.reducer;