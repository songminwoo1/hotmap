import { createSlice } from "@reduxjs/toolkit";

export const lookingPlaceSlice = createSlice({
  name: 'lookingPlace',
  initialState: {
    lookingPlaceState: 'none',
    lookingMarkerState: 'none',
  },
  reducers: {
    setLookingPlace: (state, action) => {
      state.lookingPlaceState = action.payload;
    },
    setLookingMarker: (state, action) => {
      state.lookingMarkerState = action.payload;
    }
  }
});

export const {
  setLookingPlace,
  setLookingMarker
} = lookingPlaceSlice.actions

export default lookingPlaceSlice.reducer