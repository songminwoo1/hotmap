import Whiteboard from "./whiteboard/Whiteboard";
import { closeSidebar } from "./sliceSidebar";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { palette } from '@mui/system';
import { Box, Modal, Chip, Stack, MenuItem, Avatar } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CommBoard from "./community/CommBoard";
import UserWriter from "./UserWriter";
import './Sidebar.css';

import { GetCommunity, VoteTagUp, VoteTagDown } from "./db/BackEnd";

export var current_sidebar_pinId = 'carrot';

function Sidebar(props) {
  const dispatch = useDispatch();
  const  sidebar  = useSelector(state => state.sidebar.sidebarState);
  const [place, setPlace] = useState({
    name: '참치아울렛 만년점',
    tags: {sushi:32, quiet:15, expensive: 10}, //must be sorted when set.
  });
  
  //디버깅용.
  // const  lookingPlace  = useSelector(state => state.lookingPlace.lookingPlaceState);
  // const  lookingMarker  = useSelector(state => state.lookingPlace.lookingMarkerState);
  // console.log("that");
  // console.log(lookingPlace, lookingMarker);

  const [newTag, setNewTag] = useState('other tags');
  const handleChange = (event) => {
    setNewTag(event.target.value);
  };

  const [community, setCommunity] = useState({
    dummy: {
      pinId: '',
      place: '',
      title: '',
      body: '',
      time: 0,
      level: 0,
    }
  });

  const update = () => GetCommunity((data)=>setCommunity(data));
  if(community["dummy"] !== undefined) {
    update();
  }

  return (
    <Modal open={sidebar==='whiteboard'} onClose={() => dispatch(closeSidebar())}
      sx={{display: 'flex', flexDirection:'row-reverse'}}
    >
      <Box sx={{width: '100%', height: 1, bgcolor: 'transparent', display:'flex'}}>
        <Box sx={{width: '75%', height: 1, bgcolor: 'transparent'}}>
          <Whiteboard whiteboardid={current_sidebar_pinId}></Whiteboard>
        </Box>
        <Box sx={{width: '25%', minWidth:'450px', height: 1, bgcolor: '#FFF4EC', flexDirection: 'column'}}>

          <Box sx={{width: '100%', height: '15%', minHeight: '100px', margin: '0', padding: '0', position:'relative'}}>
            <Box id='bar-title' sx={{width: '100%', bgcolor: '#FFF4EC'}}>
              {place.name}
            </Box>
            <Stack direction="row" justifyContent="center" spacing={1}>
            {
              Object.entries(place.tags).map( 
                ([key, value]) => 
                (
                  <Chip 
                    key={key}
                    color="primary" variant="outlined"
                    sx={{
                      height: 'auto',
                      borderColor: '#FF6666',
                      color: 'black',
                      '& .MuiChip-label': {
                        display: 'block',
                        whiteSpace: 'normal',
                      },
                    }}
                    label={<div id="chipwrap"><div className="chipplus" onClick={()=>VoteTagUp(current_sidebar_pinId, key, props.usrId, ()=>console.log('up'))}><div className="chipplus-in">+</div></div> <div id="chipmain">{ key + '|' + value }</div> <div className="chipplus" onClick={()=>VoteTagDown(current_sidebar_pinId, key, props.usrId, ()=>console.log('up'))}><div className="chipplus-in">-</div></div></div>} 
                  />
                )
              )
            }
            </Stack>
            <Box id="tags-dropdown">
              <div id="tags-dropdown-inner">
                <Chip
                  color="primary" variant="outlined"
                  sx={{
                    height: '24px',
                    borderColor: '#FF6666',
                    color: 'black',
                    '& .MuiChip-label': {
                      display: 'block',
                      whiteSpace: 'normal',
                    },
                  }}
                  label={<div id="chipwrap">
                  <div className="chipplus"><div className="chipplus-in">+</div></div>
                  <FormControl variant="standard" sx={{ m: 0, marginLeft:'4px' }} size="small" fontSize="4px">
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={newTag}
                      onChange={handleChange}
                      label="Age"
                      sx={{fontSize:'12px', fontFamily:"'Roboto Mono', monospace", padding:0, height:'20px', top:'2px'}}
                    >
                      <MenuItem value={10} fontSize="5px">None</MenuItem>
                      <MenuItem value={20}>Ten</MenuItem>
                      <MenuItem value={30}>Twenty</MenuItem>
                      <MenuItem value={40}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                  <div id="chipsel" className="chipplus"><div className="chipplus-in">|{0}</div></div>
                  <div className="chipplus"><div className="chipplus-in">-</div></div>
                  </div>} 
                />
              </div>
            </Box>
            {/* <Box sx={{position:'absolute', bottom:'0px', width:'100%', display:'flex', justifyContent:'center',
              "&:hover": {
                cursor:'pointer',
                color: 'blue'
              },
            }}
            onClick={
              update
            }>
              <Box
                component="img"
                sx={{
                height: '20px',
                width: '100px',
                }}
                alt={'refresh'}
                src={`${process.env.PUBLIC_URL}/refbut.png`}
              />
              <div id='refreshbutton'>
                refresh
              </div>
            </Box> */}
          </Box>

          <Box sx={{width: 'calc(100% + 17px)', height: 'calc(85% - 230px)', bgcolor: '#FFF4EC',
            overflowY:'scroll'
          }}>
            <CommBoard data={community} condition={(post)=>
            {
              return post.pinId === current_sidebar_pinId;
            }}/>
          </Box>

          <Box sx={{width: '100%', height: '230px', backgroundColor:'#FFF4EC'}}>
            <UserWriter pinId={'carrot'} place={place.name} refresh={update} />
          </Box>

        </Box>
      </Box>
    </Modal>
  )
}

export default Sidebar;