import {React, useState, useEffect} from 'react';
import style from './components.css';
function LetterBox(props) {
    // Individual box for letters in game
    const [activeBox, setActiveBox] = useState(false)

    function handleClick() {
        // set active when clicked for test
        setActiveBox(true)
    }

    // useEffect(() => {

    // }, [activeBox])
    return(
        
        <div className={activeBox ? "active letter-box" : "letter-box"} id={`${props.row} ${props.column}`} onClick={handleClick}>
           <p></p>
        </div>
    )
}

export default LetterBox;