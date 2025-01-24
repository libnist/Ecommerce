import { configureStore } from "@reduxjs/toolkit";

import productsReducer from "./products";
import productReducer from "./product";

const store = configureStore({
    reducer: {
        products: productsReducer,
        product: productReducer
    }
})

export default store;