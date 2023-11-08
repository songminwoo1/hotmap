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
    /> : props.data === 'berry' ? <Box
        component="img"
        sx={{
        height: '100%',
        width: '100%',
        }}
        alt={props.data}
        src={`${process.env.PUBLIC_URL}/berry.png`}
    /> : props.data === 'bluebird' ? <Box
        component="img"
        sx={{
        height: '100%',
        width: '100%',
        }}
        alt={props.data}
        src={`${process.env.PUBLIC_URL}/bluebird.png`}
    /> : props.data === 'boss' ? <Box
        component="img"
        sx={{
        height: '100%',
        width: '100%',
        }}
        alt={props.data}
        src={`${process.env.PUBLIC_URL}/boss.png`}
    /> : props.data === 'catturtle' ? <Box
        component="img"
        sx={{
        height: '100%',
        width: '100%',
        }}
        alt={props.data}
        src={`${process.env.PUBLIC_URL}/catturtle.png`}
    /> : props.data === 'cloudsmile' ? <Box
        component="img"
        sx={{
        height: '100%',
        width: '100%',
        }}
        alt={props.data}
        src={`${process.env.PUBLIC_URL}/cloudsmile.gif`}
    /> : props.data === 'cube' ? <Box
        component="img"
        sx={{
        height: '100%',
        width: '100%',
        }}
        alt={props.data}
        src={`${process.env.PUBLIC_URL}/cube.webp`}
    /> : props.data === 'hmm' ? <Box
        component="img"
        sx={{
        height: '100%',
        width: '100%',
        }}
        alt={props.data}
        src={`${process.env.PUBLIC_URL}/hmm.png`}
    /> : props.data === 'mild-thumbs' ? <Box
        component="img"
        sx={{
        height: '100%',
        width: '100%',
        }}
        alt={props.data}
        src={`${process.env.PUBLIC_URL}/mild-thumbs.png`}
    /> : props.data === 'monkey' ? <Box
        component="img"
        sx={{
        height: '100%',
        width: '100%',
        }}
        alt={props.data}
        src={`${process.env.PUBLIC_URL}/monkey.png`}
    /> : props.data === 'party' ? <Box
        component="img"
        sx={{
        height: '100%',
        width: '100%',
        }}
        alt={props.data}
        src={`${process.env.PUBLIC_URL}/party.png`}
    /> : props.data === 'popcorn' ? <Box
        component="img"
        sx={{
        height: '100%',
        width: '100%',
        }}
        alt={props.data}
        src={`${process.env.PUBLIC_URL}/popcorn.png`}
    /> : <Box>{props.data}</Box>;
}

export default StampContent;