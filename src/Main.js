import Map from "./Map";

import { Box, Button, Container } from "@mui/material";

function TopUI(){
  return(
    <Container maxWidth={false} style={{position: 'absolute', padding: 0}} sx={{zIndex: 1500, width: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
      <Box component="img" src="Logo.png"></Box>
      <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <Button variant ="contained" sx={{mr: 2, borderRadius: 30, bgcolor: 'white', ':hover':{bgcolor: '#EEEEEE'}, color: 'black', fontSize: 16}}>Under-Age</Button>
        <Button variant ="contained" sx={{mr: 2, borderRadius: 30, bgcolor: 'white', ':hover':{bgcolor: '#EEEEEE'}, color: 'black', fontSize: 16}}>Adult</Button>
        <Button variant ="contained" sx={{mr: 2, borderRadius: 30, bgcolor: 'white', ':hover':{bgcolor: '#EEEEEE'}, color: 'black', fontSize: 16}}>Men</Button>
        <Button variant ="contained" sx={{mr: 2, borderRadius: 30, bgcolor: 'white', ':hover':{bgcolor: '#EEEEEE'}, color: 'black', fontSize: 16}}>Women</Button>
      </Box>
    </Container>
  )
  ;
}

function Main(){
  return(
    <Container style={{minWidth: "100vw", width: "100vw", height: "100vh", padding: 0}} sx={{}}>
      <TopUI></TopUI>
      <Map></Map>
    </Container>
  );
}

export default Main;