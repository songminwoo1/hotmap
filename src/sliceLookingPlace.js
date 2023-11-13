import { createSlice } from "@reduxjs/toolkit";

export const lookingPlaceSlice = createSlice({
  name: 'lookingPlace',
  initialState: {
    lookingPlaceIdState: 'none',
    lookingPlaceState: 'none',
    lookingMarkerState: 'none',
  },
  reducers: {
    setLookingPlaceId: (state, action) => {
      state.lookingPlaceIdState = action.payload;
    },
    setLookingPlace: (state, action) => {
      state.lookingPlaceState = action.payload;
    },
    setLookingMarker: (state, action) => {
      state.lookingMarkerState = action.payload;
    }
  }
});

export const {
  setLookingPlaceId,
  setLookingPlace,
  setLookingMarker
} = lookingPlaceSlice.actions

export default lookingPlaceSlice.reducer