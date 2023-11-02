import { Box, Container } from '@mui/material';
import { useState, useRef } from 'react';
import { AddWhiteboardStamp, LoadWhiteboard } from '../db/BackEnd';
import './Whiteboard.css';
import { Stamp } from './Stamp';

const PutStamp = 
  (whiteboardid, updateCallback) => 
  (clickEvent) => 
{
  const x_coord = clickEvent.nativeEvent.offsetX;
  const y_coord = clickEvent.nativeEvent.offsetY;
  console.log('origin x: ' + x_coord);
  console.log('origin y: ' + y_coord);
  AddWhiteboardStamp
  (
    whiteboardid, x_coord, y_coord, 'stamp_data',
    updateCallback
  );
};

function Whiteboard(props){
  const boardRef = useRef(null);
  const [stamps, setStamps] = useState({
    updated: false,
  });

  const updateBoard = () => {
    LoadWhiteboard
    (
      props.whiteboardid,
      (new_board_data) => setStamps(new_board_data)//when the new board data arrived
    );
  };

  if('updated' in stamps) {updateBoard();};

  return <div className="whiteboard" ref={boardRef} onClick={PutStamp(props.whiteboardid, updateBoard)}>
    <h1>Whiteboard</h1>
    {
      Object.entries(stamps).map( 
        (entry) => (
          Stamp(entry[0], entry[1])
        )
      )
    }
  </div>;
};

export default Whiteboard;