import { closeSidebar } from "./slice";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Box, Modal } from "@mui/material"

function AddPlace() {
  const dispatch = useDispatch();
  const  sidebar  = useSelector(state => state.sidebar.sidebarState);

  return (
    <Modal open={sidebar==='addplace'} onClose={() => dispatch(closeSidebar())}>
      <Box sx={{position: 'absolute', top: 0, right: 0, width: 400, height: 1, bgcolor: 'white'}}>
        asdf
      </Box>
    </Modal>
  )
}

export default AddPlace;