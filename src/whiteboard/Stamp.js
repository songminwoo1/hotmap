import './Whiteboard.css';

import { Box } from '@mui/material';

import StampContent from './Content/StampContent';

export function Stamp(id, item) {
    if(item == false)
        return <></>;

    return <div key={id} className='stamp' onClick={()=>{}} style={{
        left: item.x + 'px',
        top: item.y + 'px'
    }}> 
        <Box className='j7fk3' sx={{
            // borderStyle:'solid', borderWidth:'1px',
            position:'absolute',
            display:'flex',
            alignContent:'center',
            alignItems:'center',
            justifyContent:'center'}}
        >
            <StampContent data={item.data} />
        </Box>
    </div>;
}