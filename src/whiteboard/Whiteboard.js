import { useState, useRef } from 'react';
import { AddWhiteboardStamp, LoadWhiteboard } from '../db/BackEnd';
import './Whiteboard.css';
import Stamp from './Stamp';
import background from "./blkboard.png";

export var STAMP_DATA = 'thumbsup'; //assign different value for different stamp.

const stamp_list = ['thumbsup', 'smile'];
var current_stamp_number = 0;

const stamp_roll_forward = () => {
  current_stamp_number += 1;

  if(stamp_list.length == current_stamp_number)
    current_stamp_number = 0;

  STAMP_DATA = stamp_list[current_stamp_number];
}
const stamp_roll_backward = () => {
  current_stamp_number -= 1;

  if(-1 == current_stamp_number)
    current_stamp_number = stamp_list.length - 1;
  
  STAMP_DATA = stamp_list[current_stamp_number];
}

function Whiteboard(props){
  const boardRef = useRef(null);
  const [stamps, setStamps] = useState({
    updated: false,
  });
  const [xMain, setxMain] = useState(0);
  const [yMain, setyMain] = useState(0);
  const [isAbove, setIsAbove] = useState(true);
  const [stampCursor, setStampCursor] = useState(STAMP_DATA);
  
  const PutStamp = (clickEvent) => 
  {
    if (clickEvent.target.id != 'qf81f7')
      return;
    const x_coord = clickEvent.nativeEvent.offsetX;
    const y_coord = clickEvent.nativeEvent.offsetY;
    // Object.assign(stamps, {cur: {x:x_coord, y:y_coord, data:STAMP_DATA}});
    // setStamps(stamps);
    AddWhiteboardStamp
    (
      props.whiteboardid, x_coord, y_coord, STAMP_DATA,
      updateBoard
    );
  };
  
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

  const handleWheelRoll = (e) => {
    if(e.deltaY > 0) {
      stamp_roll_forward();
      setStampCursor(STAMP_DATA);
    }else {
      stamp_roll_backward();
      setStampCursor(STAMP_DATA);
    }
  }

  const updateBoard = () => {
    LoadWhiteboard
    (
      props.whiteboardid,
      (new_board_data) => setStamps(new_board_data)//when the new board data arrived
    );
  };

  if('updated' in stamps) {updateBoard();};

  return <div id='wbcont' style={{backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
    <div id='qf81f7' className="whiteboard" ref={boardRef} 
      onMouseEnter={()=>setIsAbove(true)} 
      onMouseLeave={()=>setIsAbove(false)} 
      onMouseMove={handleMouseMove} 
      onWheel={handleWheelRoll}
      onClick={PutStamp}
    />
    {
      Object.entries(stamps).map( 
        ([key, value]) => (
          Stamp(key, value)
        )
      )
    }
    <div 
      id='wbcursor'
    >
      {(isAbove) ? Stamp(0, {x:xMain, y:yMain, data:stampCursor}) : null}
    </div>
  </div>;
};

export default Whiteboard;