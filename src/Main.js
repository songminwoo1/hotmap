import Map from "./Map";
import Sidebar from "./Sidebar";
import AddPlace from "./AddPlace";

import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import { Box, Button, Container, FormControlLabel, Modal, Radio, RadioGroup, FormLabel, Typography } from "@mui/material";

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
  const radioStyle = {
    color: '#D8D8D8',
    '&.Mui-checked': {
      color: '#FF6666'
    }
  };
  const agelabelPosition = {
    position: 'relative', 
    top: '10px', 
    left: '20px'
  };
  const ageradioPosition = {
    position: 'relative', 
    top: '10px', 
    left: '40px'
  };
  const genderlabelPosition = {
    position: 'relative', 
    top: '20px', 
    left: '20px'
  };
  const genderradioPosition = {
    position: 'relative', 
    top: '20px', 
    left: '40px'
  };
  const Labelstyle = {
    fontSize: '18px',
    color: '#000000'
  }




  return(
    <Container style={{minWidth: "100vw", width: "100vw", height: "100vh", padding: 0}} sx={{}}>
      <Modal open={cookies.UID===undefined} onClose={console.log()} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Box sx={{width: 300, height: 275, bgcolor: '#FFF4EC', borderRadius: 2, position: 'relative'}}>
        <Typography variant="h5" sx={{textAlign: 'center', marginTop: '20px', color: '#000000'}}>
          Personal Data
        </Typography>
        <FormLabel id="age-label" style={agelabelPosition} sx={Labelstyle}>Age</FormLabel>
          <RadioGroup row onChange={(e)=>{setCookie('age', e.target.value, {path:'/', maxAge: 365*24*60*60})}} style={ageradioPosition}>
            <FormControlLabel value="under-age" control={<Radio sx={radioStyle} />} label="Under-age" />
            <FormControlLabel value="adult" control={<Radio sx={radioStyle} />} label="Adult" />
          </RadioGroup>
        <FormLabel id="gender-label" style={genderlabelPosition} sx={Labelstyle}>Gender</FormLabel>
          <RadioGroup row onChange={(e)=>{setCookie('gender', e.target.value, {path:'/', maxAge: 365*24*60*60})}} style={genderradioPosition}>
            <FormControlLabel value="man" control={<Radio sx={radioStyle} />} label="Man" />
            <FormControlLabel value="woman" control={<Radio sx={radioStyle} />} label="Woman" />
          </RadioGroup>
          <Button 
            variant="outlined" 
            style={{
              position: 'absolute',
              bottom: '10px',
              right: '10px',
              color: '#FF6666', 
              borderColor: '#FF6666',
            }}
            onClick={()=>{
              setCookie('UID', crypto.randomUUID(), {path:'/', maxAge: 365*24*60*60})
            }}
          >Submit</Button>
        </Box>
      </Modal>

      <TopUI age={age} setAge={setAge} gender={gender} setGender={setGender}></TopUI>
      <Map></Map>
      <Sidebar pinId={'someid000'} usrId={cookies.UID}></Sidebar>
      <AddPlace></AddPlace>
    </Container>
  );
}

export default Main;