import './Whiteboard.css';

export function Stamp(id, item) {
    if(item == false)
        return <></>;

    return <div key={id} className='stamp' style={{
        left: item.x + 'px',
        top: item.y + 'px'
    }}> {item.data} </div>;
}