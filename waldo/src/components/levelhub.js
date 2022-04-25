import PreviewCard from './previewcard.js'
import {React, useState, useEffect} from 'react';
import style from './component.css'
import GameImage from './gameimage.js';
// Images

import Postcard from '../images/postcard.jpeg'
import Circus from '../images/circus.jpeg';
import Beach from '../images/pic2.jpeg';
import Fair from '../images/pic3.jpeg';
import Village from '../images/pic4.jpeg';
import Beach2 from '../images/beach2.png'

// Character profiles
import Waldo from '../images/waldo-profile.png';
import Odlaw from '../images/odlaw.png';
import Wenda from '../images/wenda.jpg';

// game data
const GAME_DATA = require('../__mocks__/gamedata.json')
// Image path 
const IMG_PATH = '../images/'
// Mock data

const gameData = require('../__mocks__/gamedata.json');
    // object with image name, image, characters and charactoer coordinates

// const gameImages = [Postcard, Circus, Beach, Fair, Village]
const charImages = [Waldo, Odlaw, Wenda]

const MOCK = require('../__mocks__/mock.json')
const WALDO = [211, 1463] // approximate location of waldo in Village Image

function LevelHub(props) {
    // container for holding image preview cards, 
    const [gameState, setGameState] = useState(false);
    const [gameImage, setGameImage] = useState();
    const [characters, setCharacters] = useState(); // list of characters that appear in gameImage
    const [gameData, setGameData] = useState(loadGameData)
    // const [post, setPost] = useState(mockFetchData("postcard"))
    function handlePreviewClick() {
        // When a use clicks on a preview image, bring up the image in a modal and begin the game.
    }

    // Coordinates for character format
    // const pcardWaldoCoords = gameData[0]['Postcard']['characters']['Waldo'].coordinates
    // const postcardImg = gameData[0]['Postcard'].image
    function mockFetchData(imageTitle) {
        // fetch data from the server for a game image
        // use imageTitle as the key to find the data
        // mock is an array of json objects
        for(let i = 0; i < MOCK.length; i++) {
            if(MOCK[i].title === imageTitle) {
                return MOCK[i]
            }
        }

    }

    function loadGameData() {
        // fetch game data
        const gameData = GAME_DATA // this will be a fetch
        return gameData
    }
    function startGame() {
        // Start the game, begin a timer, and end game when user has selected all characters correctly
    }

    function handleImageClick(event) {
        // when a preview image is clicked, load that image as a modal overlay
        // gamestate -> true, gameImage -> the image that was clicked
        // console.log("Clicking image from parent", event.target.alt, gameImages[event.target.alt])
        setGameState(true)
        setGameImage(require(`../images/${gameData[event.target.alt].image}`))
        setCharacters(gameData[event.target.alt].characters)
    }
    
    function resetOnModalClose() {
        // close the modal, set gameState false, image to none
        setGameState(false)
        setGameImage()
        setCharacters()
    }

    useEffect(() => {
        // console.log("Gamestate", gameState)
        // console.log("Game Data", gameData)

    }, [gameState]) 

    return (
        <div className="level-hub">
            <PreviewCard image={require(`../images/${gameData['Postcard'].image}`)} title={"Postcard"} characters={gameData['Postcard'].characters} characterpics={charImages} onClick={handleImageClick}/>
            <PreviewCard image={require(`../images/${gameData['Circus'].image}`)} title={"Circus"} characters={gameData['Circus'].characters} characterpics={charImages} onClick={handleImageClick}/>
            <PreviewCard image={require(`../images/${gameData['Beach'].image}`)} title={"Beach"} characters={gameData['Beach'].characters} characterpics={charImages} onClick={handleImageClick}/>
            <PreviewCard image={require(`../images/${gameData['Village'].image}`)} title={"Village"} characters={gameData['Village'].characters}characterpics={charImages} onClick={handleImageClick}/>
            <PreviewCard image={require(`../images/${gameData['Fair'].image}`)} title={"Fair"} characters={gameData['Fair'].characters} characterpics={charImages} onClick={handleImageClick}/>
            <PreviewCard image={require(`../images/${gameData['Beach2'].image}`)} title={"Beach2"} characters={gameData['Beach2'].characters} characterpics={charImages} onClick={handleImageClick}/>
            {gameState
            ? <GameImage image={gameImage} characters={characters} functions={props.functions} close={resetOnModalClose}/>
            : <span></span>
            }
        </div>
    )
}

export default LevelHub