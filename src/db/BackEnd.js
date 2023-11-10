import * as DB from './Firebase';

export const AddWhiteboardStamp = (board_id, x_coord, y_coord, data, onpush) =>
    DB.append('whiteboard/' + board_id, {
        x: x_coord,
        y: y_coord,
        data: data
    },onpush);

export const LoadWhiteboard = (board_id, onload) =>
    DB.read('whiteboard/' + board_id, 
        (data) => 
        {
            if (data == null) 
            {
                onload({});
            }
            else
            {
                onload(data);
            }
        }
    );

export const LogAll = () => 
    DB.read('/',
    (data) => console.log(data)
    );

export const AddPin = (data, onpush) => 
    DB.append('pin/', data, onpush);

export const GetPinList = (onload) =>
    DB.read('pin/',
        (data) =>
        {   
            console.log("Pin List: ");
            console.log(data);
            if (data == null) 
            {
                onload({});
            }
            else
            {
                onload(data);
            }
        }
    );

export const AddCommunityPost = (data, onload) =>
    DB.append('community/', data, onload);
    
export const GetCommunity = (onload) => 
DB.read('community/',
    (data) => 
    {
        if(data == null)
        {
            onload({});
        }
        else {
            onload(data);
        }
    }
);
