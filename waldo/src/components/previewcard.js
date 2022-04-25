import {useState, useEffect} from 'react';

import style from './component.css'
import Waldo from '../images/waldo-profile.png';
import Odlaw from '../images/odlaw.png';
import Wenda from '../images/wenda.jpg';

// Mock data
const MOCK = require('../__mocks__/mock.json')


function PreviewCard(props) {
    // props.characters - an array of character objects
        // props.character.name (char name), props.character.image (image url), props.character.coordinates (char coords in img)
    // props.characterpics = array of imported images of characters
    // Preview for photo to display on main app home, clicking will bring up photo to 
    // begin looking for objects
    // loadMock(props.title)
    // I think because the image variable is directly referencing a path, the path is different from this
    // file location
    
    const [images, setImage] = useState();

    function getImages() {
        // get images from props and return in usable state hopefully
        const images = []
        props.characters.forEach(character => {
            let img = require(character.image)
            images.push(img)
        })
        return images
    }
    // console.log("Character props in preview", props.characters)
    return (
        <div className="photo-preview">
            
            <img src={props.image} alt={props.title} onClick={props.onClick}/>
            <div className="photo-prev-container">
                {Object.keys(props.characters).map((char) => {
                    // console.log("Props in map", char)
                    return <img key={char} className="overlay-profile" src={require(`../images/${props.characters[char].image}`)}/>
                })}
                <h2 className="photo-preview-desc">{props.title}</h2>
            </div>
        </div>
    )
}

export default PreviewCard