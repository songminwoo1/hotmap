import { createSlice } from "@reduxjs/toolkit";

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState: {
    sidebarState: 'none',
    text: '',
  },
  reducers: {
    closeSidebar: (state) => {
      state.sidebarState = 'none';
    },
    readyAddPlace: (state) => {
      state.sidebarState = 'ready'
    },
    openAddPlace: (state, action) => {
      state.sidebarState = 'addplace';
      state.text = action.payload;
    },
    openWhiteboard: (state) => {
      state.sidebarState = 'whiteboard';
    }
  }
});

export const {
  closeSidebar,
  readyAddPlace,
  openAddPlace,
  openWhiteboard
} = sidebarSlice.actions

export default sidebarSlice.reducer