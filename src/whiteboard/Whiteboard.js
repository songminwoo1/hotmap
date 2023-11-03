import { useState, useRef } from 'react';
import { AddWhiteboardStamp, LoadWhiteboard } from '../db/BackEnd';
import './Whiteboard.css';
import { Stamp } from './Stamp';

export var STAMP_DATA = 'smile'; //assign different value for different stamp.

const PutStamp = 
  (whiteboardid, updateCallback) =>
  (clickEvent) => 
{
  if (clickEvent.target.id != 'qf81f7')
    return;
  const x_coord = clickEvent.nativeEvent.offsetX;
  const y_coord = clickEvent.nativeEvent.offsetY;
  AddWhiteboardStamp
  (
    whiteboardid, x_coord, y_coord, STAMP_DATA,
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

  return <div id='qf81f7' className="whiteboard" ref={boardRef} onClick={PutStamp(props.whiteboardid, updateBoard)}>
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