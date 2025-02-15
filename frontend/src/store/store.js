import { configureStore } from "@reduxjs/toolkit";

import productsReducer from "./products";
import productReducer from "./product";
import cartReducer from "./cart";
import userReducer from "./user";
import orderReducer from "./order";
import orderDetailsReducer from "./orderDetails";
import orderPayReducer from "./payOrder";
import myOrdersReducer from "./myOrders";
import usersReducer from "./users";
import userDeleteReducer from "./userDelete";

const store = configureStore({
    reducer: {
        products: productsReducer,
        product: productReducer,
        cart: cartReducer,
        user: userReducer,
        order: orderReducer,
        orderDetails: orderDetailsReducer,
        pay: orderPayReducer,
        myOrders: myOrdersReducer,
        users: usersReducer,
        userDelete: userDeleteReducer,
    }
})

export default store;