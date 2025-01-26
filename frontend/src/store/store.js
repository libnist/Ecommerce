import { configureStore } from "@reduxjs/toolkit";

import productsReducer from "./products";
import productReducer from "./product";
import cartReducer from "./cart";

const store = configureStore({
    reducer: {
        products: productsReducer,
        product: productReducer,
        cart: cartReducer,
    }
})

export default store;