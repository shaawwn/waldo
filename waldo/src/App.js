import style from './style.css';
import Postcard from './images/postcard.jpeg'
import PreviewCard from './components/previewcard'
import LevelHub from './components/levelhub';
import Banner from './components/banner';

// Mock data

function App() {

  function generateSquare(coordinates) {
    // Given top left coordinates, ie [0,0], generate 100x100 pixel square
    let square = 'Square'
    return square
  }

  function checkClick(coordinates) {
    const square = generateSquare(coordinates)
    console.log("Checking click", square)
    // Return true if a click is within the given coordinates
  }

  function getClickedCoordinates(event) {
    // return the event for a mouse click
    // get the coordinates of the mouseclick event
    // event.nativeEvent.offsetX/Y are the image coordinates
    event.stopPropagation()
    let x = event.nativeEvent.offsetX;
    let y = event.nativeEvent.offsetY;
    console.log("Click event", x, y)
    checkClick()
  }

  return (
    <div>
      <Banner />
      <LevelHub functions={getClickedCoordinates}/>
    </div>
  )
}

export default App;