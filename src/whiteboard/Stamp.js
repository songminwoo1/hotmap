import './Whiteboard.css';

export function Stamp(id, item) {
    // console.log(id);
    // console.log(item);
    if(item == false)
        return <></>;

    // console.log('x: ' + item.x);
    // console.log('y: ' + item.y);

    return <div key={id} className='stamp' style={{
        left: item.x + 'px',
        top: item.y + 'px'
    }}> {item.data} </div>;
}