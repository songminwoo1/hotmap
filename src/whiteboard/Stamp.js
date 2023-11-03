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
        <Box sx={{
            width: '160px', height: '160px', borderStyle:'solid', borderWidth:'1px',
            position:'absolute',
            left:'-80px',
            top:'-80px',
            display:'flex',
            alignContent:'center',
            alignItems:'center',
            justifyContent:'center'}}
        >
            <StampContent data={item.data} />
        </Box>
    </div>;
}