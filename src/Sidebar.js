import Whiteboard from "./whiteboard/Whiteboard";
import { closeSidebar } from "./sliceSidebar";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { palette } from '@mui/system';
import { Box, Modal, Chip, Stack, MenuItem, Avatar } from "@mui/material";
import CommBoard from "./community/CommBoard";
import UserWriter from "./UserWriter";
import './Sidebar.css';

import { GetCommunity } from "./db/BackEnd";

export var current_sidebar_pinId = 'carrot';

function Sidebar(props) {
  const dispatch = useDispatch();
  const  sidebar  = useSelector(state => state.sidebar.sidebarState);
  const [place, setPlace] = useState({
    name: '참치아울렛 만년점',
    tags: {sushi:32, quiet:15, expensive: 10}, //must be sorted when set.
  });
  
  //디버깅용.
  const  lookingPlace  = useSelector(state => state.lookingPlace.lookingPlaceState);
  const  lookingMarker  = useSelector(state => state.lookingPlace.lookingMarkerState);
  console.log(lookingPlace, lookingMarker);

  const [community, setCommunity] = useState({
    // deadbeef: {
    //   pinId: 'f1920dj2',
    //   place: '참치아울렛 만년점',
    //   title: 'new menu',
    //   body: 'The new menu "rosted carrot" was so good',
    //   time: Date.now() - 2000,
    //   level: 42,
    // },
    // deadbee0: {
    //   pinId: 'f1920dj2',
    //   place: '참치아울렛 만년점',
    //   title: 'cat 고양이 고양이 고양이 고양이 고양이 고양이 고양이 고양이 고양이 고양이',
    //   body: 'was sleeping under the window. 고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이',
    //   time: Date.now() - 300000,
    //   level: 25,
    // },
    // beef1001: {
    //   pinId: 'f83jh1u1',
    //   place: '칠구치킨',
    //   title: 'no potato',
    //   body: 'gimme da potato',
    //   time: Date.now() - 10000000,
    //   level: 13,
    // }

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
        <Box sx={{width: '25%', minWidth:'300px', height: 1, bgcolor: 'white', flexDirection: 'column'}}>

          <Box sx={{width: '100%', height: '15%', minHeight: '100px', margin: '0', padding: '0', position:'relative'}}>
            <Box id='bar-title' sx={{width: '100%', bgcolor: 'white'}}>
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
                      '& .MuiChip-label': {
                        display: 'block',
                        whiteSpace: 'normal',
                      },
                    }}
                    label={<div id="chipwrap"><div id="chipplus">+</div> <div id="chipmain">{ key + ' | ' + value }</div> <div id="chipplus">-</div></div>} 
                  />
                )
              )
            }
            <Chip
              color="primary" variant="outlined"
              sx={{
                height: 'auto',
                '& .MuiChip-label': {
                  display: 'block',
                  whiteSpace: 'normal',
                },
              }}
            >
              label={'others'}
            </Chip>
            </Stack>
            <Box sx={{position:'absolute', bottom:'0px', width:'100%', display:'flex', justifyContent:'center',
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
            </Box>
          </Box>

          <Box sx={{width: 'calc(100% + 17px)', height: 'calc(85% - 245px)', bgcolor: 'lightblue',
            overflowY:'scroll'
          }}>
            <CommBoard data={community} condition={(post)=>
            {
              return post.pinId === current_sidebar_pinId;
            }}/>
          </Box>

          <Box sx={{width: '100%', height: '245px', backgroundColor:'ivory'}}>
            <UserWriter pinId={'carrot'} place={place.name} refresh={update} />
          </Box>

        </Box>
      </Box>
    </Modal>
  )
}

export default Sidebar;