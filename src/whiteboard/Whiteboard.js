import { Box, Container } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import * as DB from './../db/Firebase'

export function LoadWhiteboard(path)
{
    console.log(DB.read('whiteboard/' + path));
    return;
}

export function AppendWhiteboard(path, data)
{
    DB.append('whiteboard/' + path, data);
}

function Whiteboard(){
    //AppendWhiteboard('testboard1', [0,0,0, 'some text']);
    //LoadWhiteboard('testboard1');
    console.log('whiteboard');
    return (
      <Container maxWidth={false} sx={{width: 1, height: 1, m: 0, p: 0}}>
        <h1>
        Whiteboard
        </h1>
      </Container>
    );
};

export default Whiteboard;