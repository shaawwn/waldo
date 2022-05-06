import PreviewCard from './previewcard.js'
import {React, useState, useEffect} from 'react';
import style from './component.css'
import GameImage from './gameimage.js';

// functions
import checkGameTime from '../logic/checkgametime.js';
import updateTopScores from '../logic/updatetopscores.js';
// Images

// firebase
import { getFirestore, collection, query, getDocs, getDoc, doc } from 'firebase/firestore'
import { getData, getObject } from '../firebase-functions/getdata.js';
import returnPromise from '../firebase-functions/promises.js'
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
// const GAME_DATA = require('../__mocks__/gamedata.json')
// Image path 
const IMG_PATH = '../images/'
// Mock data

// const gameData = require('../__mocks__/gamedata.json');
    // object with image name, image, characters and charactoer coordinates

// const gameImages = [Postcard, Circus, Beach, Fair, Village]
const charImages = [Waldo, Odlaw, Wenda]

const MOCK = require('../__mocks__/mock.json')
const WALDO = [211, 1463] // approximate location of waldo in Village Image

function LevelHub(props) {
    // container for holding image preview cards, 
    // props.firebaseDependencies - firebase methods and objects
    const [gameState, setGameState] = useState(false);
    const [gameImage, setGameImage] = useState();
    const [currentGame, setCurrentGame] = useState();
    const [characters, setCharacters] = useState(); // list of characters that appear in gameImage
    // const [gameData, setGameData] = useState(loadGameData)
    const [gameData, setGameData] = useState()
    const [gameTimer, setGameTimer] = useState(0)

    const [gameObjectData, setGameObjectData] = useState()
    // const [getObjectData, setObjectData] = useState(getObject("Postcard"))
    function handlePreviewClick() {
        // When a use clicks on a preview image, bring up the image in a modal and begin the game.
    }

    // console.log(returnPromise(['test']))
    function setData() {
        // console.log("Game data props", props.gameData)
        props.gameData.then(
            value => {
                console.log("Game data value", value)
                setGameData(value)
            }
        )
        // setGameData(props.gameData)
    }
    function createPreview(title) {
        // console.log("Calling preview")
        getObject(title).then(
            object => {
                try {
                    // console.log(object)
                    // console.log(returnPreview(object))
                    // returnPreview(object)
                    setGameObjectData(object)
                } catch(e) {
                    console.log("Not returning object", e)
                }
            },
    
        )
    }
    

    function returnPreview(object) {
        // console.log("in return", object)
        return <PreviewCard image={require(`../images/postcard.jpeg`)} title={object.title} characters={object.characters} characterpics={charImages} onClick={handleImageClick}/>
    }


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

    function startGame() {
        // Start the game, begin a timer, and end game when user has selected all characters correctly
    }

    function handleImageClick(event) {
        // when a preview image is clicked, load that image as a modal overlay
        // gamestate -> true, gameImage -> the image that was clicked
        // console.log("Clicking image from parent", event.target.alt, gameImages[event.target.alt])
        setGameState(true)
        setGameImage(require(`../images/${gameData[event.target.alt].image}`))
        setCurrentGame(event.target.alt)
        setCharacters(gameData[event.target.alt].characters)
        
        // start game timer
        const startTime = new Date()
        setGameTimer(startTime)
    }
    
    function resetOnModalClose() {
        // close the modal, set gameState false, image to none
        setGameState(false)
        setGameImage()
        setCharacters()
        handleCheckScore() // handles all logic/functionality for checking and updating gametime score
        setCurrentGame()
        setGameTimer(0) // resets the game time to 0
    }

    function handleCheckScore() {
        // collects checkGameTime, updateTopScores, and postGameTime functions
        const endTime = new Date() - gameTimer
        const topScores = gameData[currentGame].topScores.sort(function(a,b) {
            return a - b
        })

        if(topScores.length < 10) {
            // automatically push to topScores to populate
            topScores.push(endTime)
            postGameTime(endTime, currentGame, topScores)
        } else if(checkGameTime(endTime, topScores)) {
            const newScores = updateTopScores(endTime, topScores)
            postGameTime(endTime, currentGame, newScores)
        }
    }

    function postGameTime(time, game, topScores) {
        // when completing a game, record the game time, if it is within the top 10 scores, then add it to the correct
        // spot in the top scores list
        // times are in ms, so they can be sorted with numerical value (200 < 300, 2 seconds faster than 3)
        // time - time, in ms, that the game image was open for ()
        // game - title of image used for game (eg 'Postcard'), used as key for object to record time in
        // gameTimes the array of topScores from a game

        // This will push the data to top scores, but not persist between reloads
        console.log("Posting new scores", time, game, topScores)
        // console.log(checkGameTime(time, topScores))

        // so if checkGameTime returns true, that means the sscore is WITHIN the top scores, meaning,
        // pop() the gameTimes array to get rid of the last score, then insert the new game time
        // need to ensure that the topScores array is arranged from smallest -> largest
        // fetch("/post/data/here", {
            // method: "POST",
            // headers: {'Content-Type': 'application/json'}, 
            // body: JSON.stringify(data)
        // }).then(res => {
        // console.log("Request complete! response:", res);
        // });
    }
    // console.log(getObject("Postcard").then(object => returnPreview(object)))

    function parseGameDataObjects() {
        // loop through game data and return react components
        // if that doesn't work, loop through data and set gameObject data to equal that,then use that object
        // to create react components
        // console.log("DATA", props.gameData)
        Object.keys(props.gameData).map((object)=> {
            // console.log("Object", object)
            // returnPreview(props.gameData[object])
            // return true
            return <PreviewCard image={require(`../images/${props.gameData[object].image}`)} title={"Postcard"} characters={props.gameData[object].characters} characterpics={charImages} onClick={handleImageClick}/>

        }) 
        // console.log("GD", props.gameData)
 
    }
    useEffect(() => {
        // console.log("GAME DATA", props.gameData)
        // const thing = createPreview("Postcard")
        // console.log("Thing: ", thing)
        createPreview("Postcard")
        // setGameData(setData())

    }, [gameState]) 

    return (
        <div className="level-hub">
            {/* {createPreview("Postcard")} */}
            {/* {returnPreview(gameObjectData)} */}
            {gameObjectData
            ? Object.keys(props.gameData).map((object) => {
                return <PreviewCard image={require(`../images/${props.gameData[object].image}`)} title={props.gameData[object].title} characters={props.gameData[object].characters} characterpics={charImages} onClick={handleImageClick}/>
            })
            :<span></span>
            }
            {/* {getObjectData.then(object => returnPreview(object))} */}
            {/* <PreviewCard image={require(`../images/${gameData['Postcard'].image}`)} title={"Postcard"} characters={gameData['Postcard'].characters} characterpics={charImages} onClick={handleImageClick}/> */}
            {/* <PreviewCard image={require(`../images/${gameData['Circus'].image}`)} title={"Circus"} characters={gameData['Circus'].characters} characterpics={charImages} onClick={handleImageClick}/> */}
            {/* <PreviewCard image={require(`../images/${gameData['Beach'].image}`)} title={"Beach"} characters={gameData['Beach'].characters} characterpics={charImages} onClick={handleImageClick}/> */}
            {/* <PreviewCard image={require(`../images/${gameData['Village'].image}`)} title={"Village"} characters={gameData['Village'].characters}characterpics={charImages} onClick={handleImageClick}/> */}
            {/* <PreviewCard image={require(`../images/${gameData['Fair'].image}`)} title={"Fair"} characters={gameData['Fair'].characters} characterpics={charImages} onClick={handleImageClick}/> */}
            {/* <PreviewCard image={require(`../images/${gameData['Beach2'].image}`)} title={"Beach2"} characters={gameData['Beach2'].characters} characterpics={charImages} onClick={handleImageClick}/> */}
            {gameState
            ? <GameImage image={gameImage} characters={characters} functions={props.functions} close={resetOnModalClose}/>
            : <span></span>
            }
        </div>
    )
}

export default LevelHub