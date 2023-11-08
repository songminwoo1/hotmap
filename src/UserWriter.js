import './UserWriter.css';

import { Box, TextField, Button, Paper } from '@mui/material';

function UserWriter() {
    return <Box sx={{
padding: '5px',
paddingTop: '15px'
}}>
    <Paper elevation={1} sx={{
        width: '100%', 
        overflow: 'auto',
    }}>
        <Box className="card">
            <Box className="card-top">
                <Box className="card-place">
                    value.place
                </Box>
                <Box className="card-title" sx={{
                    color: 'green',
                }}>
                    value.title
                </Box>
            </Box>
            <Box className="card-body">
                value.body
            </Box>
        </Box>
    </Paper>
</Box>;
}

export default UserWriter;