import {React, useState, useEffect} from 'react';

function Key(props) {
    // props: active(activeRow, activeLetterBox) active[0] => [0], [1] for row then letterbox
    // Individual key for keyboard

    // Needs some awareness of which letterbox is currently active, so that anything pressed will update THAT box and no
    // other boxes    
    const active = props.active[0][0] // easier to see what active row, box is

    // console.log("Key  props", active)
    function handleClick(event) {
        // handle click events that will update the letterbox values
        const keyValue = event.nativeEvent.target.innerText; // using this value, populate the coresponding active letterbox
        const current = document.querySelector('.column-1')
        // console.log("Clicking key", keyValue, current, props)
        props.keyClick(keyValue)
        
    }

    return (
        <div className="key" onClick={handleClick}>
            <p>{props.letter}</p>
        </div>
    )
}

export default Key