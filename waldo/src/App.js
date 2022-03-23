import style from './style.css';
import Postcard from './images/postcard.jpeg'

const WALDO = [500, 120]
function App() {

  function generateSquare(coordinates) {
    // Given top left coordinates, ie [0,0], generate 100x100 pixel square
    let square = 'Square'
    return square
  }

  function sumTest(a, b) {
    return a + b
  }
  function checkClick(coordinates) {
    const square = generateSquare(coordinates)
    console.log("Checking click", square)
    // Return true if a click is within the given coordinates
  }
  function checkMouseClick(event) {
    // return the event for a mouse click
    // event.nativeEvent.offsetX/Y are the image coordinates
    event.stopPropagation()
    // console.log("Clicking div", event)
    // console.log("Offset left", event.nativeEvent)
    // let x = event.nativeEvent.offsetX;
    // let y = event.nativeEvent.offsetY;
    // let totX = event.clientX;
    // let totY = event.clientY;
    // console.log("Coordinates of image", x, y)
    // console.log("Coordinates in page", totX, totY, event)
    checkClick()
  }

  // return (
  //   <div onClick={checkMouseClick}>
  //     <h1>App loaded!</h1>
  //     <img src={Postcard} onClick={checkMouseClick}/>
  //   </div>
  // )
}

function sum(a, b) {
  return a + b
}
module.exports = sum;
// export default App;


// Starting from the top left corning x/y, create a 100/100 square
// so if topleft = 500/120, then dimensions are 600/120, 500/220, 600/220
// Top left 500/120
// Top Right 550/120
// Lower Left 500/175
// Lower Right 550/175

// Given the top left coordinates, generate a square 100x100 pixels wide

// Using this square, determine if a click is within that square