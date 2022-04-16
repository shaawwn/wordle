import {React, useState, useEffect} from 'react';
import style from './components.css';
function LetterBox(props) {
    // Individual box for letters in game
    const [activeBox, setActiveBox] = useState(false)

    // console.log("Guess letter state in box", props.letterState)
    // true, false, partial
    const [guessState, setGuessState] = useState(false) // guessState determines the color of the letterbox upon submitting a word

    function handleClick() {
        // set active when clicked for test
        setActiveBox(true)
    }

    useEffect(() => {
        setGuessState(props.letterState)
    }, [props.letterState])
    return(
        
        <div className={activeBox ? `active letter-box` : `letter-box letter-box-${guessState}`} id={`${props.row} ${props.column}`} onClick={handleClick}>
           <p></p>
        </div>
    )
}

export default LetterBox;