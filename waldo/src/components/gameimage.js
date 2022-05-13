import checkSquare from '../logic/checksquare.js'
import {useState, useEffect} from 'react';
import Square from './square-overlay.js';
import TopScores from './topscores.js';
const WALDO = [211, 1463] // approximate location of waldo in Village Image
const DRUNK = [785, 896] // location of drinking man
const CHARS = {
    'Waldo': [211, 1463],
    'Drunk': [785, 896]
}
function GameImage(props) {
    // Modal with image loaded for user to begin playing the game
    // onClick = props.functions 
    // props.characters = object of characters for game image {'Waldo': {'image': imageURL, 'coords': [0,0]}}
        // ex const waldo = props.characters['Waldo'].image, props.characters['Waldo'].coordinates
    // console.log("Waldo props", props.characters['Waldo'].image, props.characters['Waldo'].coordinates)
    // console.log("Game image props", props)
    const [characters, setcharacters] = useState(props.characters) // characters should be matched up with the database
    const [selectedChars, setSelectedChars] = useState(setCharacterState)
    const [overlay, setOverlay] = useState(false)
    const [overlayLocation, setOverlayLocation] = useState([])
    const [clickedCoords, setClickedCoords] = useState()
    const [gameOver, setGameOver] = useState() // setting true will render Top Scores window
    const [tempScore, setTempScore] = useState() // just test to see if I can get new scores in topscores

    function checkCoordinates(event, character) {
        // check clicked coordinates against server data on where character is
        // event.stopPropagation()

        const char = event.target.innerText
        const coords = getClickCoordinates(event) // as is, from square-overlay gets coords from dropdown 
        // console.log("Returned coordinates", coords, WALDO)
        // console.log(checkSquare(WALDO, coords))
        // checkSquare(charCoords, clickedCoords) returns true if match
        if(checkSquare([0,0],coords)) { // []0,0] placeholder
            console.log("True")
            return true
        }
        return false
    }

    function setCharacterState() {
        // props.characters provides a list of characters, this function sets a boolean value for whether that character
        // is currently selected or unselected for the purposes of ending the game
        let selectedChars = {}
        console.log("Props characters", props.characters)
        // props.characters.forEach(character => {
        //     selectedChars[character] = false
        // })
        Object.keys(props.characters).forEach(character => {
            selectedChars[character] = false;
        })

        return selectedChars
    }

    function handleCharacterSelect(charName) {
        // if a character is correctly selected, set selectedChar[character] = true, else do nothing
        // console.log("Handing character select", charName.toString())
        

        setSelectedChars(selectedChars => ({
            ...selectedChars,
            [charName]: true // [] are required to use existing key 
        }));
    }

    function checkGameOver() {
        // checks that all characters have been found in an image
        // if all chars from selectedChars == true, game is over!
        if(Object.keys(selectedChars).every(char => selectedChars[char] === true)) {
            handleGameOver()
        }
    }

    function handleGameOver() {
        // when game over state is reached, record final time searching, enter name (when backend/user funcitonality),
        // hitting 'OK' in alert/popup should then close window
        // update the score in the DB with new score here?
        if(window.confirm("Game over!")) { // this is where the game should "officially" end
            // do other stuff here like keep track of score, time, update user information


            // update top Scores here
            setTempScore(props.handleCheckScore()) // this will now return array of top scores
            setGameOver(true)
        }
    }

    function getClickCoordinates(event) {
        // returns the coordinates [x,y] of click event
        event.stopPropagation()
        let x = event.nativeEvent.offsetX;
        let y = event.nativeEvent.offsetY;
        const coordinates = [x, y]
        return coordinates
    }

    function closeImage() {
        // Close the image when the close button is clicked
        const closeBtn = document.querySelector('.close-btn')
        const gameImage = document.querySelector('.game-image')
        closeBtn.addEventListener('click', () => {
            gameImage.style.display = 'none';
        })
        props.close()
    }


    function handleClick(event) {
        const clickCoords = props.getClickedCoordinates(event)
        // const clickCoords = getClickCoordinates(event)
        // checkCoordinates(event) // gets coordinates in the image
        // console.log("Coordinates of clickx", clickCoords)
        if(overlay === true) {
            setOverlay(false)
            setOverlayLocation()
        } else {
            setOverlay(true)
            setOverlayLocation(clickCoords)
        }
    }
    // Game -image is a fill screen modal
    // checkSquare()
    // need to get the clicked coordinates when clicking on the image,
        // then run checkSquare
    function closeTopScores() {
        setGameOver(false)
        // props.close() // calls parent function resetOnModalClose which closes gameImage and calls several functions
    }
    useEffect(() => {
        // console.log("Overlay location in gameimage", overlayLocation)
        // console.log("Character State", selectedChars)
        checkGameOver()
    }, [overlayLocation])

    return (
        <div className="game-image">
            <span className="close-btn" onClick={closeImage}>X</span>
            <img src={props.image} alt={"game image"} onClick={handleClick} />
            {/* <Square characters={CHARS}/> */}
            {overlay
            ? <Square characters={characters} coords={overlayLocation} functions={handleCharacterSelect} charValue={selectedChars}/>
            : <span></span>
            }
            {gameOver
            ? <TopScores close={props.close} displayScores={[props.close, gameOver]} scores={tempScore} dataFunctions={props.dataFunctions}/>
            :<span></span>
            }
        </div>
    )
}

export default GameImage;