import { closeSidebar } from "./slice";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Box, Modal } from "@mui/material"

function Whiteboard1() {
  const dispatch = useDispatch();
  const  sidebar  = useSelector(state => state.sidebar.sidebarState);

  return (
    <Modal open={sidebar==='whiteboard'} onClose={() => dispatch(closeSidebar())}>
      <Box sx={{width: 400, height: 1, bgcolor: 'white'}}>
        asdf
      </Box>
    </Modal>
  )
}

export default Whiteboard1;