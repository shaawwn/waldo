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
import { getData, getObject, updateDocument } from '../firebase-functions/getdata.js';
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

// Image path 
const IMG_PATH = '../images/'

const charImages = [Waldo, Odlaw, Wenda]

function LevelHub(props) {
    // container for holding image preview cards, 
    // props.firebaseDependencies - firebase methods and objects
    const [gameState, setGameState] = useState(false);
    const [gameImage, setGameImage] = useState();
    const [currentGame, setCurrentGame] = useState();
    const [characters, setCharacters] = useState(); // list of characters that appear in gameImage
    const [gameData, setGameData] = useState()
    const [gameTimer, setGameTimer] = useState(0)

    const [gameObjectData, setGameObjectData] = useState()
    const [topScores, setTopScores] = useState()
    function handlePreviewClick() {
        // When a use clicks on a preview image, bring up the image in a modal and begin the game.
    }


    function startGame() {
        // Start the game, begin a timer, and end game when user has selected all characters correctly
    }

    function handleImageClick(event) {
        // when a preview image is clicked, load that image as a modal overlay
        // gamestate -> true, gameImage -> the image that was clicked
        // console.log("Clicking image from parent", event.target.alt, gameImages[event.target.alt])
        // console.log("Getting", event.target.alt, getObject(event.target.alt))
        // setGameObjectData(getObject(event.target.alt))
        setGameState(true)
        // setGameImage(require(`../images/${gameData[event.target.alt].image}`))
        setCurrentGame(event.target.alt)
        // setCharacters(gameData[event.target.alt].characters)
        // start game timer
        
        const startTime = new Date()
        setGameTimer(startTime)
    }

    
    function resetOnModalClose() {
        // close the modal, set gameState false, image to none
        setGameState(false) // Possibly no longer need this
        setGameImage()
        setCharacters()
        setGameObjectData() // closes the game image when this is set to None
        // handleCheckScore() // handles all logic/functionality for checking and updating gametime score
        setCurrentGame()
        setGameTimer(0) // resets the game time to 0
    }

    function handleCheckScore() {
        // collects checkGameTime, updateTopScores, and postGameTime functions
        // console.log("Handle check score", gameObjectData.topScores)
        const endTime = new Date() - gameTimer
        const topScores = Object.keys(gameObjectData.topScores).sort(function(a,b) {
            // entire point of this is to just sort the scores
            // returns a list of top scores, not an object of scores like what should be the the final update
            return a - b

        })
        
        if(topScores.length < 3) { // if there are no top scores, automatically add score to top scores
            topScores.push(endTime)
            // updateDocument('gameObjects', currentGame, 'topScores', topScores) // update with correct object of type {score: name}
        } else if(checkGameTime(endTime, topScores)) {
            console.log("New score set!", endTime)
            const newScores = updateTopScores(endTime, topScores)
            checkForKeyValue(newScores)
            // createNewTopScores(newScores)
            return createNewTopScores(newScores)
            // updateDocument('gameObjects', currentGame, 'topScores', newScores)
        } else {
            // score is not in top scores
            return false
        }
    }

    function createNewTopScores(scores) {
        // given newScores list, create a new object to update db with
        let updatedScores = {}
        scores.forEach(score => {
            updatedScores[score] = gameObjectData.topScores[score]
        })
        return updatedScores
        // console.log(updatedScores)
    }
    function checkForKeyValue(topScores) {
        // if a value in topscore has no corresponding value, that is the new score
        topScores.forEach(score => {
            // console.log(score)
            // console.log("Checking top scores", score, gameObjectData.topScores[score])
            if(gameObjectData.topScores[score] === undefined) {
                // I feel like, realistically, a new top score should return {score: name}, then update with that info
                console.log("Undefined user for", score)
            }
        }) 
    }

    function setGameObject(title) {
        getObject(title).then(
            object => {
                setGameObjectData(object)
            }
        )
    }

    function sortScoreByKeys(topscores) {
        // test sorting by keys
        // topscores are an object with the score as a key, and user as a value, in order to be able to sort
        // by score-key more easily
        const scores = {1535:"Shawn", 683:"Ben", 23232:"Mark"}

        const sortedScores = Object.keys(scores).sort(function(a, b) {
            return a- b
        })
        console.log("SortedScores", sortedScores)
    }

    useEffect(() => {
       if(gameState) {
           setGameObject(currentGame)
       } 
    //    sortScoreByKeys()
    }, [gameState]) 

    return (
        <div className="level-hub">
            {props.gameData /* check to see if game data exists, if it does, load*/
            ? Object.keys(props.gameData).map((object) => {
                return <PreviewCard image={require(`../images/${props.gameData[object].image}`)} title={props.gameData[object].title} characters={props.gameData[object].characters} characterpics={charImages} onClick={handleImageClick}/>
            })
            :<span></span>
            }
            {gameObjectData
            ? <GameImage image={require(`../images/${gameObjectData.image}`)} 
                getClickedCoordinates={props.getClickedCoordinates}
                handleCheckScore={handleCheckScore}
                characters={gameObjectData.characters} functions={props.functions} 
                dataFunctions={props.dataFunctions} close={resetOnModalClose} 
                scores={gameObjectData.topScores}/>
            : <span>{gameObjectData}</span>
            }
        </div>
    )
}

export default LevelHub