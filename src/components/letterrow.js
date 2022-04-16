import {React, useState, useEffect} from 'react';
import LetterBox from './letterbox.js';
function Row(props) {
    // Row containing either empty letters, currently typed letters, or completed gueses
    // props: id (row id number)
    // console.log("Prosp in letterow", props.guessArray) 
    // guessArray - an array of guess objects ('a': false, etc)
    // console.log("Guess array with ID", props.guessArray[parseInt(props.id)])
    
    // guessArray shoudl be the array of letters with boolean values
    // const [guessArray, setGuessArray] = useState({0: false, 1: false, 2: false, 3: false, 4: false})
    const [guessArray, setGuessArray] = useState(props.guessArray)
    const [activeRow, setactiveRow] = useState(false) // if row is active, letters will appear as typed
    // const [letterState, setLetterState] = useState(false)
    
    useEffect(() => {
        // console.log("Guess array in row", guessArray, props.guessArray[parseInt(props.id)])
        // setGuessArray(props.guessArray[parseInt(props.id)])
    }, [guessArray]) // no need to refresh page, AT ALL, just updated the contents of letterbox
    
    // letterState={Object.keys(guessArray[0])
    return(
        // create a letter box with id using row ID# plus column# (should result in unique ids)
        <div className="row" id={props.id}>
            <LetterBox row={`row-${props.id}`} column="col-0" letterState={props.guessArray[Object.keys(props.guessArray)[0]]}/>
            <LetterBox row={`row-${props.id}`} column="col-1" letterState={props.guessArray[Object.keys(props.guessArray)[1]]}/>
            <LetterBox row={`row-${props.id}`} column="col-2" letterState={props.guessArray[Object.keys(props.guessArray)[2]]}/>
            <LetterBox row={`row-${props.id}`} column="col-3" letterState={props.guessArray[Object.keys(props.guessArray)[3]]}/>
            <LetterBox row={`row-${props.id}`} column="col-4" letterState={props.guessArray[Object.keys(props.guessArray)[4]]}/>
        </div>
    )
}

export default Row;