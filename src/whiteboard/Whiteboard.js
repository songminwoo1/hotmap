import { Box, Container } from '@mui/material';
import { useState } from 'react';
import { AddWhiteboardStamp, LoadWhiteboard } from '../db/BackEnd';
import './Whiteboard.css';
import { Stamp } from './Stamp';

// const AddStamp = (updateaction) => (event) => {
//   const container = document.querySelector('.whiteboard');
//   const div = document.createElement('div');
//   div.className = 'created-div';
  
//   // Set the position of the div to the click coordinates
//   let bound = container.getBoundingClientRect();
//   div.style.left = (event.clientX - bound.left) + 'px';
//   div.style.top = (event.clientY - bound.top) + 'px';
//   container.appendChild(div);

//   AddWhiteboardStamp('testboard1',
//     (event.clientX - bound.left) / (bound.right - bound.left),
//     (event.clientY - bound.top) / (bound.bottom - bound.top),
//     'stamp!',
//     updateaction
//   );
// };

const PutStamp = (whiteboardid, updateCallback, targetWhiteboard) => (clickEvent) => {
  console.log('eulisse: ' + whiteboardid);
};

function Whiteboard(props){
  const [stamps, setStamps] = useState({
    A1: {x:0.3, y:0.5, data:'carrot'},
    A2: {x:0.5, y:0.5, data:'dango'},
    A3: {x:0.7, y:0.5, data:'egg'},
    A4: {x:0.5, y:0.2, data:'frog'},
    A5: {x:0.5, y:0.8, data:'grape'},
  });

  return <div className="whiteboard" onClick={PutStamp(props.whiteboardid, setStamps, this)}>
    <h1>Whiteboard</h1>
    {
      Object.entries(stamps).map( 
        (it, index) => (
          Stamp(it[0], it[1])
        )
      )
    }
  </div>;
};

export default Whiteboard;