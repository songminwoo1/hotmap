import { configureStore } from "@reduxjs/toolkit";
import { sidebarSlice } from "./sliceSidebar";
import { lookingPlaceSlice } from "./sliceLookingPlace";

const store = configureStore({
    reducer: {
        sidebar: sidebarSlice.reducer,
        lookingPlace: lookingPlaceSlice.reducer
    }
})

export default store;