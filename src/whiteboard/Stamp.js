import './Whiteboard.css';

export function Stamp(id, item) {
    console.log(id);
    console.log(item);
    return <p>{'itEm'}</p>;
    // // Create a new div element
    // const newDiv = document.createElement('div');

    // // Set a class or styles for the new div (you can customize this)
    // newDiv.className = 'random-div';
    // newDiv.style.width = '100px';
    // newDiv.style.height = '100px';
    // newDiv.style.backgroundColor = 'blue';
    // newDiv.style.position = 'absolute';

    // // Calculate random coordinates within the viewport
    // const screenWidth = window.innerWidth;
    // const screenHeight = window.innerHeight;

    // const randomLeft = Math.random() * (screenWidth - 100); // Adjust for div width
    // const randomTop = Math.random() * (screenHeight - 100); // Adjust for div height

    // // Set the position of the div
    // newDiv.style.left = randomLeft + 'px';
    // newDiv.style.top = randomTop + 'px';

    // // Add the div to the body or another container element
    // return newDiv;
    return <div className='stamp-bg' key={id}>
        Item
        {item.data}
    </div>;
}