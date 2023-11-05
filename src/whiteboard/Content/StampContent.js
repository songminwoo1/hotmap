import { Box } from '@mui/material';

function StampContent(props) {
    return props.data === 'thumbsup' ? <Box
        component="img"
        sx={{
        height: '100%',
        width: '100%',
        }}
        alt={props.data}
        src="https://www.transparentpng.com/thumb/thumbs-up/real-thumbs-up-png-clipart-eDCldo.png"
    /> : props.data === 'smile' ? <Box
        component="img"
        sx={{
        height: '100%',
        width: '100%',
        }}
        alt={props.data}
        src="https://cdn-icons-png.flaticon.com/512/8445/8445889.png"
    /> : <Box>{props.data}</Box>;
}

export default StampContent;