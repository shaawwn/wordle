import {React, useState, useEffect} from 'react';
import Key from './key.js'
import uniqid from 'uniqid';
function KeyboardRow(props) {
    // props: rowLevel, active(activeRow, activeLetterBox)
    // row for the keyboard
    // props.rowLevel is level on the keyboard 
    const [row, setRow] = useState(props.rowLevel)
    // const top = ['qwertyuiop'];
    // const middle = ['asdfghjkl'];
    // const bottom = ['ent','zxcvbnm','del'];

    function parseRow(row) {

        // parse string of row to create list of keys
        let newRow = [];

        row.forEach(element => {
            if(element === 'ent' || element === 'del') {
                newRow.push(element.toUpperCase())
            } else {
                for(let i = 0; i < element.length; i++) {
                    // if(Object.keys(props.letterStatus).includes(element[i])) {
                    //     // Letter has been guessed, key needs to reflect this information via color of key (grey, green, yellow)
                    //     console.log("ELement is guessed", element[i], props.letterStatus[element[i]])
                    // }
                    
                    newRow.push(element[i].toUpperCase())
                }
            }
        })
        return newRow;
        // setCurrentKeys(newRow)
    }
    
    function checkRow() {
        // set the row

        // if(props.rowLevel === 'top') {
        //     // parseRow(top)
        //     setRow(top)
        // }
        // if(props.rowLevel === 'middle') {
        //     // parseRow(middle)
        //     setRow(middle)
        // }
        // if(props.rowLevel === 'bottom') {
        //     // parseRow(bottom)
        //     setRow(bottom)
        // }
    }

    useEffect(() => {
        // row=setRow()
        // checkRow()
        // console.log("Current status", currentKeys)
    }, [])

    function checkLetterStatus() {
        // check if a key has been guessed and update key status based on that information (correctly guessed letter will have green)
            // colored key for example
    }
    return (
        <div className="keyboard-row">
            {/* <Key letter="Q"/>
            <Key letter="W"/>
            <Key letter="E"/>
            <Key letter="R"/>
            <Key letter="T"/>
            <Key letter="Y"/>
            <Key letter="U"/>
            <Key letter="I"/>
            <Key letter="O"/>
            <Key letter="P"/> */}
            {
                parseRow(props.rowLevel).map((element) => {
                    // console.log(element)
                    return <Key key={uniqid()}letter={element} keyClick={props.keyClick} active={[props.active]} />
                })
            }
        </div>
    )
}

export default KeyboardRow;