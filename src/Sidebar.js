import Whiteboard from "./whiteboard/Whiteboard";
import { closeSidebar } from "./sliceSidebar";

import { useCookies } from "react-cookie";
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

import { GetCommunity, VoteTagUp, VoteTagDown, GetTags } from "./db/BackEnd";

const tag_t = ['cozy', 'casual', 'traditional', 'cheap', 'expensive', 'quiet', 'noisy', 'clean', 'dirty', 'night', 'day', '-'];

function sortKeysByValue(obj) {
  return Object.entries(obj)
      .sort((a, b) => b[1] - a[1])
      .map(entry => entry[0]);
}
const getTopTags = (allTags) =>
{
  const keys = sortKeysByValue(allTags);
  const topkeys = keys.slice(0, 3);

  var result = {};
  for(const entry of topkeys)
  {
    result[entry] = allTags[entry];
  }
  return result;
} 

var prev_lookingIdPlace = '';

function Sidebar(props) {
  const [cookies, setCookie, removeCookie] = useCookies(['stampCount']);
  if(cookies.stampCount===undefined)
  {
    console.log("cookie not set");
    setCookie('stampCount', {}, {path:'/', maxAge: 365*24*60*60});
  }

  const addStampCookie = (targ_pin) =>
  {
    var prev = cookies.stampCount;
    console.log(cookies);

    if(prev[targ_pin] === undefined) {
      prev[targ_pin] = 1;
    }
    else
    {
      prev[targ_pin] += 1;
    }

    setCookie('stampCount', prev, {path:'/', maxAge: 365*24*60*60});
  };

  const dispatch = useDispatch();
  const  sidebar  = useSelector(state => state.sidebar.sidebarState);
  const [tags, setTags] = useState({
    hmm:'hmm' //must be sorted when set
  });
  
  const  lookingIdPlace  = useSelector(state => state.lookingPlace.lookingPlaceIdState);
  const  lookingPlace  = useSelector(state => state.lookingPlace.lookingPlaceState);
  const  lookingMarker  = useSelector(state => state.lookingPlace.lookingMarkerState);
  const  updateTags = () => {
    GetTags(lookingIdPlace, setTags);
  };
  
  if(tags["hmm"] !== undefined || prev_lookingIdPlace !== lookingIdPlace)
  {
    console.log("tags update");
    prev_lookingIdPlace = lookingIdPlace;
    updateTags();
  }
  else
  {
    console.log("tags not update");
    console.log(tags);
  }
  
  //디버깅용.
  console.log("llll");
  console.log(lookingIdPlace);
  console.log(lookingPlace);
  console.log(lookingMarker);
  console.log("hhhh")

  const [newTag, setNewTag] = useState('-');
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

  const top_tags = getTopTags(tags);

  const getUserT = () => {
    const is_adult = cookies.age === "adult";
    const is_man = cookies.gender === "man";

    return is_adult && is_man ? "AM" : is_adult ? "AW" : is_man ? "UM" : "UW";
  }

  return (
    <Modal open={sidebar==='whiteboard'} onClose={() => dispatch(closeSidebar())}
      sx={{display: 'flex', flexDirection:'row-reverse'}}
    >
      <Box sx={{width: '100%', height: 1, bgcolor: 'transparent', display:'flex'}}>
        <Box sx={{width: '75%', height: 1, bgcolor: 'transparent'}}>
          <Whiteboard whiteboardid={lookingIdPlace} punch={()=>addStampCookie(lookingIdPlace)} user_t={getUserT()}></Whiteboard>
        </Box>
        <Box sx={{width: '25%', minWidth:'450px', height: 1, bgcolor: '#FFF4EC', flexDirection: 'column'}}>

          <Box sx={{width: '100%', height: '15%', minHeight: '100px', margin: '0', padding: '0', position:'relative'}}>
            <Box id='bar-title' sx={{width: '100%', bgcolor: '#FFF4EC'}}>
              {lookingPlace.name}
            </Box>
            <Stack direction="row" justifyContent="center" spacing={1}>
            {
              Object.entries(top_tags).map( 
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
                    label={<div id="chipwrap"><div className="chipplus" onClick={()=>VoteTagUp(lookingIdPlace, key, props.usrId, updateTags)}><div className="chipplus-in">+</div></div> <div id="chipmain">{ key + '|' + value }</div> <div className="chipplus" onClick={()=>VoteTagDown(lookingIdPlace, key, props.usrId, updateTags)}><div className="chipplus-in">-</div></div></div>} 
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
                  etc: 
                  <div className="chipplus" onClick={()=>{
                    if(newTag !== '-')
                      VoteTagUp(lookingIdPlace, newTag, props.usrId, updateTags);
                  }}><div className="chipplus-in">+</div></div>
                  <FormControl variant="standard" sx={{ m: 0, marginLeft:'4px' }} size="small" fontSize="4px">
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={newTag}
                      onChange={handleChange}
                      label="Age"
                      sx={{fontSize:'12px', fontFamily:"'Roboto Mono', monospace", padding:0, height:'20px', top:'2px'}}
                    >
                      {
                        tag_t.map(ety => {
                          if(top_tags[ety] === undefined) {
                            return <MenuItem value={ety} fontSize="5px">{ety}</MenuItem>;
                          }
                          else {
                            return null;
                          }
                        })
                      }
                    </Select>
                  </FormControl>
                  <div id="chipsel"><div>|{
                    (tags[newTag] === undefined) ? 0 : tags[newTag]
                  }</div></div>
                  <div className="chipplus" onClick={()=>{
                    if(newTag !== '-')
                      VoteTagDown(lookingIdPlace, newTag, props.usrId, updateTags);
                  }}><div className="chipplus-in">-</div></div>
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
              return post.pinId === lookingIdPlace;
            }}/>
          </Box>

          <Box sx={{width: '100%', height: '230px', backgroundColor:'#FFF4EC'}}>
            <UserWriter pinId={lookingIdPlace} place={lookingPlace.name} refresh={update} level={cookies.stampCount[lookingIdPlace]}/>
          </Box>

        </Box>
      </Box>
    </Modal>
  )
}

export default Sidebar;