import { useState, useEffect } from 'react'
import style from './style.css';
import Postcard from './images/postcard.jpeg'
import PreviewCard from './components/previewcard'
import LevelHub from './components/levelhub';
import Banner from './components/banner';
import { getObject, getData } from './firebase-functions/getdata';

// Import general functions in App.js
import { generateSquare, checkClick, getClickedCoordinates } from './logic/getcoordinates.js';
// Mock data

function App(props) {
  const [gameObjectData, setGameObjectData] = useState()

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
      ? <LevelHub 
        getClickedCoordinates={getClickedCoordinates}
        function={getClickedCoordinates}
        dataFunctions={props.dataFunctions} 
        firebaseDependencies={props.firebaseDependencies} 
        gameData={gameObjectData} />
      :<span><h1>LOADING.....</h1></span>
      }
    </div>
  )
}

export default App;