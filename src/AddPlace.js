import { closeSidebar, openAddPlace } from "./sliceSidebar";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Box, Button, IconButton, Modal, TextField } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import NotListedLocationIcon from '@mui/icons-material/NotListedLocation';



function AddPlace() {
  const dispatch = useDispatch();
  const sidebar  = useSelector(state => state.sidebar.sidebarState);
  const [text, setText] = useState("");

  return (
    <Modal open={sidebar==='ready'} onClose={() => dispatch(closeSidebar())}> 
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
      <Box 
        sx={{
          width: 340,
          height: 70,
          bgcolor: '#FFF4EC',
          borderRadius: 2,
          boxShadow: 3,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',  // To align items vertically
          alignItems: 'center',    // To center vertically
          justifyContent: 'center',
        }} //outer box of Add Pin modal
      >
        
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '90%' }}> 
          <div style={{ display: 'flex', alignItems: 'flex-end', marginBottom: '15px'}}>
            <NotListedLocationIcon sx={{ color: '#FF6666', mr: 1, my: 0.5 }} />
            <TextField 
              id="entername" 
              label="Name of Hot Place" 
              variant="standard" 
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <Button 
            variant="outlined" 
            sx={{ height: '35px' }}
            style={{
              float: "right",
              color: '#FF6666', 
              borderColor: '#FF6666',
            }}
            onClick={() => {
              dispatch(openAddPlace(text));
              setText("");
            }}
          >
            Add
          </Button>
        </Box>
      </Box>
      </div>
    </Modal>
  )
}

export default AddPlace;