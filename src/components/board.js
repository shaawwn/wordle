import {React, useState, useEffect} from 'react';
import Row from './letterrow.js';
import Keyboard from './keyboard.js';
import CheckMatch from '../logic/checkmatch.js'

// TODOs

// Need to check for whether a letter is IN the word, and change letter color depending ont hat
const TEST_DICT = ['QWERT', 'ASDFG', 'TREWQ', 'QWWTT', 'TQWER', 'TREWA']
const TEST_WORD = ['TREWA']


function GameBoard() {
    // Also, guessed word SHOULD BE A WORD, meaning I need access to some dictionary of words
    // Main gameboard for wordle clone
    // Whats the state passed to each component?
    // Rows get state of guessed word (correct, incorrect letters)
    // Keyboard gets state of individually selected letters, ie if 'G' is in the owrd, then the 'G' key should be
        // highlited Green
    const [letterState, setLetterState] = useState({ // default game state everything false, keyboard updates with guesses
            "A": false,"B": false,"C": false,"D": false,"E": false,"F": false,"G": false,"H": false,
            "I": false,"J": false,"K": false,"L": false,"M": false,"N": false,"O": false,"P": false,
            "Q": false,"R": false,"S": false,"T": false,"U": false,"V": false,"W": false,"X": false,
            "Y": false,"Z": false})
    
        
    const [guessedLetters, setGuessedLetters] = useState([]) // Empty by default, updates with each guessed word, persistent through round
    const [currentGuess, setCurrentGuess] = useState([])
    const [guessedLettersArray, setGuessedLettersArray] = useState([{},{},{},{},{},{}]) // persist guesses throughout game round

    // Default state for activeRow, activeLetterBox is default [0],[0,0], the top left most square, last row is [5, 4]
    const [activeLetterBox, setActiveLetterBox] = useState([0,0]) // The currently active letterbox needs to be known to keyboard key so
    const [activeRow, setActiveRow] = useState(0)
        // it can update the value, or, clicked key needs to be set and then active box is updated with that information
    const [clickedKey, setClickedKey] = useState() // clicked Kkey will be the value used to update the letterboxes

    function onKeyClick(keyValue) {
        // pass this function to the keyboard keys to set the clickedKey
        // activeLetterBox should update as keys are clicked, and the letterbox hsould be updated with key value
        // console.log("Current guess", currentGuess)
        if(currentGuess.length === 5) {
            console.log("Cannot enter anymore letters without submitting or deleting")
            handleDelEnt(keyValue)
            return false
        }
        const currentBox = getActiveLetterBox();
        if(keyValue === clickedKey) {
            setClickedKey()
        }
        
        if(handleDelEnt(keyValue) === false) {
            return false
        }

        if(currentGuess.length + 1 === 5) {// works once then of course I'm adding another letter so it doesn't work again
            console.log("Cannot enter anymore letters")
    
            currentBox.innerText = keyValue;
            setCurrentGuess(currentGuess.concat(keyValue))
    
            return false
        }
        setClickedKey(keyValue)
        currentBox.innerText = keyValue;
        setCurrentGuess(currentGuess.concat(keyValue))
        incrementLetterBox()

    }

    function handleDelEnt(keyValue) {
        // handle clicking delete and enter keys
        if(keyValue === 'DEL') {
            // console.log("Hitting delete", clickedKey)
            // decrementLetterBox()
            setClickedKey('DEL')
            // console.log("Deleteding in keyClik", currentGuess)
            deleteChar()
            // decrementLetterBox() // Box gets decremented here, while the actual char gets deleted in useEffect()
            return false
        }
        if(keyValue === 'ENT') {
            // console.log("Current guess afte rhitting enter", currentGuess, TEST_WORD[0].split(''))
            setClickedKey('ENT')
            if(checkValidWord()) {
                const matcher = new CheckMatch(TEST_WORD[0].split(''), currentGuess)
                if(matcher.checkWordMatch()) {
                    // matched word ending game condition
                    alert("You win!") // maybe try to do letter reveal
                } else {
                    // Check letters when game over condition is NOT met
                    updateGuessedLetters(matcher) // updates CURRENT GUESS
                    updateLetterState(matcher) // updates PERSISTENT KEYBOARD STATE through guess rows
                }
            }
            return false
        }
    }
    
    function updateLetterState(matcherObject) { // for updating the game state keyboard to reflect letter guesses
        // persistent game round state for letters, updates to reflect correctly guessed letters in order
        // to change the color on the keyboard keys
        console.log("Updating state of letters")
        ///TODO
        setLetterState(
            matcherObject.updateKeyboardState(letterState)
        )
    }

    function updateGuessedLetters(matcherObject) { // for updating the status of letters in a single guess
        // as letters are guessed, if their status changes, eg partial => true, update the guessLetters state
        // guessedLetters is an object that MAY contain all letters in the alphabet, but no duplicates, therefore
        // when an existing letter status changes, that letter ONLY needs to change status
        // this should prevent overwriting guessedLetters every time a guess is made
        console.log("Guessed letters in updateletters", guessedLetters)
        let guessedLettersRaw = {}
        let guessedLettersArrayRaw = guessedLettersArray
        const guess = matcherObject.checkLetters() // this is a raw object for this guess ONLY, need to merge/update with guessedLetters
        Object.keys(guess).forEach(letter => {

            // if(Object.keys(guessedLetters).includes(letter)) {
            //     // guessedLetters[letter] = guess[letter] // this should set guessedLetter and guess to same value
            //     // console.log("letter has already been guessed", letter)
            //     guessedLetters[letter] = guess[letter]
            // } else {
            //     console.log("Letter is new entry", letter)
            //     guessedLetters[letter] = guess[letter]
            // }

            // CHANGED FROM ABOVE!! guessedLetters => guessedLettersRaw, change back if needed
            if(Object.keys(guessedLettersRaw).includes(letter)) {
                guessedLettersRaw[letter] = guess[letter]
            } else {
                guessedLettersRaw[letter] = guess[letter]
            }
        })
        console.log("Guessed letters after function runs", guessedLetters)
        // setGuessedLetters(guessedLetters)
        setGuessedLetters(guessedLettersRaw)
        // setGuessedLettersArray(guessedLettersArray.concat(guessedLetters))
        guessedLettersArrayRaw[activeRow] = guessedLettersRaw
        setGuessedLettersArray(guessedLettersArrayRaw)
    }

    function T_updateGuessLetters(matcherObject) {
        // guessedLetters ix an existing object(imported from letters.json), that is used to check agaisnt guess
        // by default, guessedLetters begins with all letters set to false, but as letters are guessed, update that
        // state depending on success of guess, ie if letter is in word in correct order, guess letter = true
        

    }
    
    function getActiveLetterBox() {
        // returns the current active DOM letterBox, can update
        // boxs are id'd by row and column number, id="row-x col-y"
        const currentBoxID = `row-${activeLetterBox[0]} col-${activeLetterBox[1]}`
        const currentBox =  document.getElementById(`${currentBoxID}`)
        // console.log("getActiveletterbox", activeLetterBox, currentBox)
        return currentBox
    }

    function incrementLetterBox() {
        // as keys are clicked, move the boxes over one space
        // activeRow used as first argument in array coordinates ([activeRow, activeLetterBox])
        if(activeLetterBox[1] === 4) {
            incrementRow()
        } else {
            setActiveLetterBox([activeRow, activeLetterBox[1] + 1])
        }
    }

    function decrementLetterBox() {
        // users can deleter letters which will move the active box back one space and remove the ltter from that box (seperate function)
        if(activeLetterBox[1] < 1) {
            // Cannot go back a letter at the column 0
            console.log("Cannot delete", currentGuess, activeRow, activeLetterBox)
            return false
        }
        setActiveLetterBox([activeRow, activeLetterBox[1] - 1])
        console.log("Decremengint", activeLetterBox)
    }

    function incrementRow() {
        // increment the active row, cannot go back in rows, only forwards, also reset letterBox index to 0 to start new row
        console.log("Active row value", activeRow, currentGuess.length)
        if(activeRow >= 5) {
            console.log("Game over man")
            return false
        }
        setActiveRow(activeRow + 1) 
        setActiveLetterBox([activeRow + 1, 0]) // offset the async by directly setting the row, probably bad code
    }

    function deleteChar() {
        // delete last entered character when user hits DEL button
        // Must also decrement letterbox as well, cannot go back a row though
        console.log("Calling deleteChar")

        decrementLetterBox()
        // console.log("After dec. function", activeLetterBox)
        const currentBox = getActiveLetterBox(); // Active letterbox will be empty box, so....currently removes one letter behind
        console.log("Checking current box", currentBox, activeLetterBox)
        currentBox.innerText = '';
        currentGuess.pop() // Removes the last letter from the guessedWord array
        setCurrentGuess(currentGuess)
    }

    function joinLetters() {
        // return 5 letters as a string
    }

    function checkValidWord() {
        // check that guess gainst dict to ensure only valid words can be submitted)
        if(TEST_DICT.includes(currentGuess.join(""))) {
            console.log("Valid")
            setCurrentGuess([])
            incrementRow()
            return true
        } else {
            console.log("invalid", currentGuess.join(''))
            return false
        }
    }

    useEffect(() => {
        // console.log("Current guess", currentGuess) // nm check it here
        // Should not be able to advance to next row until ENT is hit
        // console.log("guessed letters", guessedLetters, guessedLettersArray)
        // console.log("Letter state", letterState)
        if(clickedKey === 'DEL') {
            // console.log("Deleted in useEffect")
            // deleteChar() // there is somethign with decrementing the box that is wonky and this needs to get called twice to work
        }
    },[clickedKey]) // repeat letters won't trigger this

    return(
        <div className="board">
            <h1>Gameboard</h1>
            <Row id="0" guessArray={guessedLettersArray[0]}/>
            <Row id="1" guessArray={guessedLettersArray[1]}/>
            <Row id="2" guessArray={guessedLettersArray[2]}/>
            <Row id="3" guessArray={guessedLettersArray[3]}/>
            <Row id="4" guessArray={guessedLettersArray[4]}/>
            <Row id="5" guessArray={guessedLettersArray[5]}/>
            <Keyboard letterStatus={letterState} keyClick={onKeyClick} active={[activeRow, activeLetterBox]}/>
        </div>
    )
}

export default GameBoard;