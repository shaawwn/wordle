import {React, useState, useEffect} from 'react';
import Key from './key.js'
import KeyboardRow from './keyboard-row.js';

function Keyboard(props) {
    // props: letterStatus, activeRow, activeLetterbox
    // letterStatus - a list of ltter that have been used in guessed words, are: true, false, 'partial'

    // Keyboard that displays at the bottom, can select letters as well as show current
    // status of letters
    const top = ['qwertyuiop'];
    const middle = ['asdfghjkl'];
    const bottom = ['ent','zxcvbnm','del'];

    return( 
        <div className="keyboard">
            <KeyboardRow rowLevel={top} letterStatus={props.letterStatus} keyClick={props.keyClick} active={[props.active]}/>
            <KeyboardRow rowLevel={middle} letterStatus={props.letterStatus} keyClick={props.keyClick} active={[props.active]}/>
            <KeyboardRow rowLevel={bottom} letterStatus={props.letterStatus} keyClick={props.keyClick} active={[props.active]}/>
        </div>
    )
}

export default Keyboard