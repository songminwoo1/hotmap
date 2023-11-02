import { configureStore } from "@reduxjs/toolkit";
import { sidebarSlice } from "./slice";

const store = configureStore({
    reducer: {
        sidebar: sidebarSlice.reducer
    }
})

export default store;