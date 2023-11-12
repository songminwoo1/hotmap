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

export const GetTags = (pinId, onload) =>
DB.read('tags/' + pinId + '/', 
    (data) =>
    {
        if(data == null)
        {
            onload({});
        }
        else
        {
            var result = {};
            for (const [key, value] of Object.entries(data)) { //tag and usr-point object
                var pt_ac = 0;
                for (const [usr, pt] of Object.entries(value)) { //tag and usr-point object
                    pt_ac += pt;
                }
                result[key] = pt_ac;
            }
            onload(result);
        }
    }
);
//{sushi:32, quiet:15, expensive: 10}

export const VoteTagUp = (pinId, tag, usrId, onload) =>
    DB.write('tags/' + pinId + '/' + tag + '/' + usrId + '/', 1, onload);

export const VoteTagDown = (pinId, tag, usrId, onload) =>
    DB.write('tags/' + pinId + '/' + tag + '/' + usrId + '/', -1, onload);