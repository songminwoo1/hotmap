import { createSlice } from "@reduxjs/toolkit";

export const lookingPlaceSlice = createSlice({
  name: 'lookingPlace',
  initialState: {
    lookingPlaceState: 'none',
  },
  reducers: {
    setLookingPlace: (state, action) => {
      state.lookingPlaceState = action.payload;
    }
  }
});

export const {
  setLookingPlace
} = lookingPlaceSlice.actions

export default lookingPlaceSlice.reducer