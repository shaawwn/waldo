import { useState, useEffect } from 'react'
import style from './style.css';
import Postcard from './images/postcard.jpeg'
import PreviewCard from './components/previewcard'
import LevelHub from './components/levelhub';
import Banner from './components/banner';
import { getObject, getData } from './firebase-functions/getdata';

// Mock data

function App(props) {
  const [gameObjectData, setGameObjectData] = useState()
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

  function setGameData() {
    getData().then(
      value => {
        setGameObjectData(value)
      }
    )
  }

  useEffect(() => {
    setGameData()
  }, [])

  return (
    <div>
      <Banner />
      {gameObjectData // only load the level hub when it actually has data
      ? <LevelHub function={getClickedCoordinates} firebaseDependencies={props.firebaseDependencies} gameData={gameObjectData} />
      :<span><h1>LOADING.....</h1></span>
      }
    </div>
  )
}

export default App;