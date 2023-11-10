import Map from "./Map";
import Sidebar from "./Sidebar";
import AddPlace from "./AddPlace";

import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import { Box, Button, Container, FormControlLabel, Modal, Radio, RadioGroup } from "@mui/material";

function TopUI({age, setAge, gender, setGender}){
  return(
    <Container maxWidth={false} style={{position: 'absolute', padding: 0}} sx={{zIndex: 1100, width: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
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
  const [cookies, setCookie, removeCookie] = useCookies(['UID', 'age', 'gender']);
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');




  return(
    <Container style={{minWidth: "100vw", width: "100vw", height: "100vh", padding: 0}} sx={{}}>
      <Modal open={cookies.UID===undefined} onClose={console.log()} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Box sx={{width: 400, height: 300, bgcolor: '#FFF4EC', borderRadius: 2}}>
          <RadioGroup row defaultValue="under-age" onChange={(e)=>{setCookie('age', e.target.value, {path:'/', maxAge: 365*24*60*60})}}>
            <FormControlLabel value="under-age" control={<Radio />} label="Under-age" />
            <FormControlLabel value="adult" control={<Radio />} label="Adult" />
          </RadioGroup>
          <RadioGroup row defaultValue="man" onChange={(e)=>{setCookie('gender', e.target.value, {path:'/', maxAge: 365*24*60*60})}}>
            <FormControlLabel value="man" control={<Radio />} label="Man" />
            <FormControlLabel value="woman" control={<Radio />} label="Woman" />
          </RadioGroup>
          <Button onClick={()=>{setCookie('UID', crypto.randomUUID(), {path:'/', maxAge: 365*24*60*60})}}>Submit</Button>
        </Box>
      </Modal>

      <TopUI age={age} setAge={setAge} gender={gender} setGender={setGender}></TopUI>
      <Map></Map>
      <Sidebar pinId={'someid000'}></Sidebar>
      <AddPlace></AddPlace>
    </Container>
  );
}

export default Main;