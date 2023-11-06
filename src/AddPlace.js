import { closeSidebar, openAddPlace } from "./slice";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Box, Button, IconButton, Modal, TextField } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import NotListedLocationIcon from '@mui/icons-material/NotListedLocation';

function AddPlace() {
  const dispatch = useDispatch();
  const sidebar  = useSelector(state => state.sidebar.sidebarState);

  return (
    <Modal open={sidebar==='ready'} onClose={() => dispatch(closeSidebar())}> 
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
      <Box 
        sx={{
          width: 300,
          height: 300,
          bgcolor: '#FFF4EC',
          borderRadius: 2,
          boxShadow: 3,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',  // To align items vertically
          alignItems: 'center',    // To center vertically
        }} //outer box of Add Pin modal
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }} style={{ marginTop: '20px', marginRight: '20px' }}> 
          <NotListedLocationIcon sx={{ color: '#FF6666', mr: 1, my: 0.5 }} />
          <TextField id="entername" label="Name of Hot Place" variant="standard" /> 
        </Box>  
        <Box style={{ marginTop: '20px', marginLeft: '10px'}} >
          <TextField 
            helperText="Explain this Hot Place (Optional)"
            label = "Explanation"
            variant = "outlined"
            rows={4}
            maxRows={4}
            multiline
          />
        </Box>
        <IconButton onClick={() => dispatch(closeSidebar())} style={{position: 'absolute', top: '10px', right: '10px'}}>
          <CloseIcon />
        </IconButton>
        <Button 
          variant="outlined" 
          style={{
            position: 'absolute', 
            bottom: '10px', 
            right: '10px', 
            color: '#FF6666', 
            borderColor: '#FF6666'
          }}
          onClick={() => {dispatch(openAddPlace())}}
        >
          Add Place
        </Button>
      </Box>
      </div>
    </Modal>
  )
}

export default AddPlace;