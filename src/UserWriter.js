import './UserWriter.css';

import { useRef } from 'react';
import { Box, Button, IconButton, TextField, Typography } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import UploadIcon from '@mui/icons-material/Upload';

import { AddCommunityPost } from './db/BackEnd';
import { getCurrentLevel } from './whiteboard/Whiteboard';

function UserWriter(props) {
    const titleRef = useRef();
    const bodyRef = useRef();

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '8px',
            paddingTop: '10px',
            justifyContent: 'space-between', // Align items to the end (right-upper side)
        }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '10px', }}>
                <Typography variant="h6" sx={{marginLeft:'5px', color: '#000000', fontWeight:'bold'}}>
                    New Post
                </Typography>
                <Box sx={{display:'flex', gap:'10px'}}>
                    <IconButton 
                        sx={{height: '30px', width: '30px'}} 
                        style={{color: '#FF8A8A', border: '2px solid', borderRadius:'5px'}}
                        onClick={() => {props.refresh();}}
                    >
                        <RefreshIcon />
                    </IconButton>
                    <Button 
                        variant="contained" 
                        startIcon={<UploadIcon />}
                        sx={{
                            height: '30px',
                            width: '100px',
                            fontWeight:'bold'
                        }}
                        style={{
                            color: '#FFFFFF', 
                            backgroundColor: '#FF6666',
                        }}
                        onClick={()=>{
                            console.log("hi");
                            AddCommunityPost(
                                {
                                    pinId: props.pinId,
                                    place: props.place,
                                    title: titleRef.current.value,
                                    body: bodyRef.current.value,
                                    time: Date.now(),
                                    level: getCurrentLevel(),
                                },
                                props.refresh,
                            );
                            titleRef.current.value = "";
                            bodyRef.current.value = "";
                        }}
                    >Upload</Button>
                </Box>
            </Box>
            <TextField sx={{width:'100%'}}
                id="outlined-multiline-static"
                label="Title"
                rows={1}
                inputRef={titleRef}
                defaultValue=""
                size='small'
            />
            <div id="mid-space"/>
            <TextField fullWidth
                id="outlined-multiline-static"
                label="Body"
                multiline
                rows={3}
                defaultValue=""
                inputRef={bodyRef}
            />
            
    </Box>
    )
}

export default UserWriter;