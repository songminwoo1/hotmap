import './UserWriter.css';

import { useRef } from 'react';
import { Box, Button, Paper, TextField } from '@mui/material';

import { AddCommunityPost } from './db/BackEnd';
import { getCurrentLevel } from './whiteboard/Whiteboard';

function UserWriter(props) {
    const titleRef = useRef();
    const bodyRef = useRef();

    return <Box sx={{
padding: '10px',
paddingTop: '15px'
}}>
    <Paper elevation={3} sx={{
        width: '100%', 
        overflow: 'auto',
    }}>
<Box sx={{width:'calc(100%-30px)', padding: '10px'}}>
    <Box sx={{height:'55px', display:'flex', flexDirection:'row'}}>
        <TextField sx={{width:'calc(100% - 50px)'}}
            id="outlined-multiline-static"
            label="Title"
            rows={1}
            inputRef={titleRef}
        />
        <Box sx={{width:'50px', height:'calc(100% - 3px)', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center',
            backgroundColor:'ghostwhite', 
            border:'solid 2px', borderColor:'lightgray', borderRadius:'5px',
            "&:hover": {
                backgroundColor:'lightgray',
                cursor:'pointer'
            },
        }} onClick={()=>
        {
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
        }}>
            <Box
                component="img"
                sx={{
                height: '40px',
                width: '40px',
                }}
                alt={'send'}
                src={`${process.env.PUBLIC_URL}/upbutton.png`}
            />
        </Box>
    </Box>
    <div id="mid-space"/>
    <TextField fullWidth
        id="outlined-multiline-static"
        label="Body"
        multiline
        rows={4}
        inputRef={bodyRef}
    />
</Box>
    </Paper>
</Box>;
}

export default UserWriter;