import Map from "./Map";
import Sidebar from "./Sidebar";
import AddPlace from "./AddPlace";

import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import { Box, Button, Container, FormControlLabel, Modal, Radio, RadioGroup } from "@mui/material";

function TopUI({underage, setUnderage, adult, setAdult, man, setMan, woman, setWoman}){
  return(
    <Container maxWidth={false} style={{position: 'absolute', padding: 0}} sx={{zIndex: 1100, width: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
      <Box component="img" src="Logo.png"></Box>
      <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <Button variant ="contained" sx={{mr: 2, borderRadius: 30, bgcolor: underage ? 'white':'#DDDDDD', ':hover':{bgcolor: '#DDDDDD'}, color: 'black', fontSize: 16}} onClick={()=>{if(underage&&!adult){setAdult(true)}; setUnderage(!underage)}}>Under-Age</Button>
        <Button variant ="contained" sx={{mr: 2, borderRadius: 30, bgcolor: adult ? 'white':'#DDDDDD', ':hover':{bgcolor: '#DDDDDD'}, color: 'black', fontSize: 16}} onClick={()=>{ if(!underage&&adult){setUnderage(true)}; setAdult(!adult)}}>Adult</Button>
        <Button variant ="contained" sx={{mr: 2, borderRadius: 30, bgcolor: man ? 'white':'#DDDDDD', ':hover':{bgcolor: '#DDDDDD'}, color: 'black', fontSize: 16}} onClick={()=>{if(man&&!woman){setWoman(true)}; setMan(!man)}}>Men</Button>
        <Button variant ="contained" sx={{mr: 2, borderRadius: 30, bgcolor: woman ? 'white':'#DDDDDD', ':hover':{bgcolor: '#DDDDDD'}, color: 'black', fontSize: 16}} onClick={()=>{if(!man&&woman){setMan(true)}; setWoman(!woman)}}>Women</Button>
      </Box>
    </Container>
  );
}

function Main(){
  const [cookies, setCookie, removeCookie] = useCookies(['UID', 'age', 'gender']);
  const [underage, setUnderage] = useState(true);
  const [adult, setAdult] = useState(true);
  const [man, setMan] = useState(true);
  const [woman, setWoman] = useState(true);


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

      <TopUI underage={underage} setUnderage={setUnderage} adult={adult} setAdult={setAdult} man={man} setMan={setMan} woman={woman} setWoman={setWoman}></TopUI>
      <Map underage={underage} adult={adult} man={man} woman={woman}></Map>
      <Sidebar pinId={'someid000'}></Sidebar>
      <AddPlace></AddPlace>
    </Container>
  );
}

export default Main;