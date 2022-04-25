import {React, useState, useEffect} from 'react';
import checkSquare from '../logic/checksquare.js';
import uniqid from 'uniqid';
// Images
// import Waldo from '../images/waldo-profile.png';
function Square(props) {
    // props.characters - an object of character to find in image  eg: {'Waldo': [500,500]}
    // props.coords - coordinates of user click in game image
    // props.functions = handleCharacterSelect() funciton from gameimage.js parent component
    // need to set the overlay to the pixel location of the click....
    const [characters, setCharacters] = useState(Object.keys(props.characters))
    function createDropdown() {
        // create a dropdown menu of characters and add to square when user clicks on image
        const dropdown = document.createElement('div');
        dropdown.classList.add('char-dropdown')
        return dropdown;
    }
    // console.log("Chars in overlay", props.characters)
    function checkCoords(event) {
        // check clicked coordinates against character coordinates
        const char = event.target.innerText
        const clickedCoords = event.target
        
        if(checkSquare(props.characters[char].coordinates,props.coords)) {
            // Set character in dropdown to have a check or something
            // event.target.innerText = `√ ${char}`
            props.functions(char)
        } else {
            // Some better feedback when a user is incorrect
            console.log("Incorrect")
        }
    }

    function handleClick(event) {
        // onClick event when selecting a character in dropdown menu
        console.log(event.target.innerText)
        checkCoords(event)
        // props.functions(event.target.innerText)
    }

    // console.log("Prop coords", props.coords, props.coords[1] + 75, props.coords[0] + 100)
    return (
        // The +75 and + 100 px offeset differs greatly depending on screen
        
        <div className="char-select-square" style={{top: (`${props.coords[1] + 50}px`), left: (`${props.coords[0] + 100}px`)}}> 
            <div className="square-overlay">

            </div>
            <div className="dropdown">
                {characters.map((char)=> {
                    return (
                        <div className="dropdown-select-container" key={uniqid()}>
                            <img key={uniqid()} src={require(`../images/${props.characters[char].image}`)} className="overlay-profile"></img>
                            
                            {props.charValue[char]
                            ? <p className="char-select" key={uniqid()} onClick={handleClick}>√{char}</p>
                            :<p className="char-select" key={uniqid()} onClick={handleClick}>{char}</p>
                            }
                        </div>)
                    // <p className="char-select" key={char} onClick={checkCoords}>{char}</p>
                })}
            </div>
        </div>
    )
}

export default Square