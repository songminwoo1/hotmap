import Map from "./Map";
import Whiteboard from "./whiteboard/Whiteboard";

import { useState } from "react";

import { Box, Button, Container } from "@mui/material";

function TopUI({age, setAge, gender, setGender}){
  return(
    <Container maxWidth={false} style={{position: 'absolute', padding: 0}} sx={{zIndex: 1500, width: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
      <Box component="img" src="Logo.png"></Box>
      <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <Button variant ="contained" sx={{mr: 2, borderRadius: 30, bgcolor: age=='under-age' ? '#DDDDDD':'white', ':hover':{bgcolor: '#DDDDDD'}, color: 'black', fontSize: 16}} onClick={()=>{setAge('under-age')}}>Under-Age</Button>
        <Button variant ="contained" sx={{mr: 2, borderRadius: 30, bgcolor: age=='adult' ? '#DDDDDD':'white', ':hover':{bgcolor: '#DDDDDD'}, color: 'black', fontSize: 16}} onClick={()=>{setAge('adult')}}>Adult</Button>
        <Button variant ="contained" sx={{mr: 2, borderRadius: 30, bgcolor: gender=='men' ? '#DDDDDD':'white', ':hover':{bgcolor: '#DDDDDD'}, color: 'black', fontSize: 16}} onClick={()=>{setGender('men')}}>Men</Button>
        <Button variant ="contained" sx={{mr: 2, borderRadius: 30, bgcolor: gender=='women' ? '#DDDDDD':'white', ':hover':{bgcolor: '#DDDDDD'}, color: 'black', fontSize: 16}} onClick={()=>{setGender('women')}}>Women</Button>
      </Box>
    </Container>
  );
}

function Main(){
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');

  return(
    <Container style={{minWidth: "100vw", width: "100vw", height: "100vh", padding: 0}} sx={{}}>
      <TopUI age={age} setAge={setAge} gender={gender} setGender={setGender}></TopUI>
      <Map></Map>
      <Whiteboard></Whiteboard>
    </Container>
  );
}

export default Main;