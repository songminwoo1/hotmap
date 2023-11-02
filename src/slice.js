import { createSlice } from "@reduxjs/toolkit";

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState: {
    sidebarState: 'none',
  },
  reducers: {
    closeSidebar: (state) => {
      state.sidebarState = 'none';
    },
    openAddPlace: (state) => {
      state.sidebarState = 'addplace';
    },
    openWhiteboard: (state) => {
      state.sidebarState = 'whiteboard';
    }
  }
});

export const {
  closeSidebar,
  openAddPlace,
  openWhiteboard
} = sidebarSlice.actions

export default sidebarSlice.reducer