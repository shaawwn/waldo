import style from './component.css';
import {React, useState, useEffect} from 'react';
function HamburgerMenu(props) {
    // Hamburger menu for dropdowns

    return (
        <div className="hamburger-menu" onClick={props.onclick}>
            <hr className="hamburger-patty" />
            <hr className="hamburger-patty" />
            <hr className="hamburger-patty" />
        </div>
    )
}

function DropDown(props) {
    // dropdown from hamburger menu to select personal scores, global highschore, sign in, signout

    return (
        <div className="menu-dropdown">
            <p className="menu-option">Your Scores</p>
            <p className="menu-option">High Scores</p>
            <p className="menu-option">Signout</p>
        </div>
    )
} 
function Banner(props) {
    // Banner for homepage
    const [toggleDropdown, setToggleDropdown] = useState(false)

    function loadDropdown() {
        // When hamburger is clicked, toggle dropdown menu
        console.log("Loading dropdown menu")
        // setToggleDropdown()
        if(toggleDropdown === false) {
            setToggleDropdown(true)
        } else {
            setToggleDropdown(false)
        } 
    }

    useEffect(() => {
        
    }, [toggleDropdown]) 
    
    return (
        <div className="banner">
            <h1>Where's Waldo?</h1>
            <HamburgerMenu onclick={loadDropdown}/>
            {toggleDropdown
            ? <DropDown />
            :<span className="filler"></span>
            }
        </div>
    )
}

export default Banner