import Whiteboard from "./whiteboard/Whiteboard";
import { closeSidebar } from "./slice";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Box, Modal } from "@mui/material"

function Sidebar() {
  const dispatch = useDispatch();
  const  sidebar  = useSelector(state => state.sidebar.sidebarState);

  return (
    <Modal open={sidebar==='whiteboard'} onClose={() => dispatch(closeSidebar())}
      sx={{display: 'flex', flexDirection:'row-reverse'}}
    >
      <Box sx={{width: '100%', height: 1, bgcolor: 'transparent', display:'flex'}}>
        <Box sx={{width: '75%', height: 1, bgcolor: 'transparent'}}>
          <Whiteboard whiteboardid='change-this-to-load-different-board'></Whiteboard>
        </Box>
        <Box sx={{width: '25%', height: 1, bgcolor: 'white'}}>
          Sidebar
        </Box>
      </Box>
    </Modal>
  )
}

export default Sidebar;