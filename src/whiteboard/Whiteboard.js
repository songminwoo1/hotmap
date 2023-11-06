import { useState, useRef } from 'react';
import { AddWhiteboardStamp, LoadWhiteboard } from '../db/BackEnd';
import './Whiteboard.css';
import { Stamp } from './Stamp';

export var STAMP_DATA = 'thumbsup'; //assign different value for different stamp.

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
  const [xMain, setxMain] = useState(0);
  const [yMain, setyMain] = useState(0);
  const [isAbove, setIsAbove] = useState(true);
  
  const handleMouseMove = (e) => {
    // Using pageX and pageY will cause glitching when you scroll the window down
    // because it measures the distance from the top left rendered corner, not
    // top left visible corner
    const clientX = e.nativeEvent.offsetX;
    const clientY = e.nativeEvent.offsetY;

    // we set the main circle coordinates as soon as the mouse is moved
    setxMain(clientX);
    setyMain(clientY);
  };

  const updateBoard = () => {
    LoadWhiteboard
    (
      props.whiteboardid,
      (new_board_data) => setStamps(new_board_data)//when the new board data arrived
    );
  };

  if('updated' in stamps) {updateBoard();};

  return <div id='wbcont'>
    <div id='qf81f7' className="whiteboard" ref={boardRef} onMouseEnter={()=>setIsAbove(true)} onMouseLeave={()=>setIsAbove(false)} onMouseMove={(e) => handleMouseMove(e)} onClick={PutStamp(props.whiteboardid, updateBoard)}></div>
    {
      Object.entries(stamps).map( 
        (entry) => (
          Stamp(entry[0], entry[1])
        )
      )
    }
    <div 
      id='wbcursor'
    >
      {(isAbove) ? Stamp(0, {x:xMain, y:yMain, data:STAMP_DATA}) : null}
    </div>
  </div>;
};

export default Whiteboard;