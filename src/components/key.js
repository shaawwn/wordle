import {React, useState, useEffect} from 'react';

function Key(props) {
    // props: active(activeRow, activeLetterBox) active[0] => [0], [1] for row then letterbox
    // Individual key for keyboard

    // Needs some awareness of which letterbox is currently active, so that anything pressed will update THAT box and no
    // other boxes
    const [status, setStatus] = useState(false) // starts false by default
    console.log("Props in key", props)
    const letterStatus = props.letterStatus
    const active = props.active[0][0] // easier to see what active row, box is

    function checkState() {
        // check the status of the key/letter
        if(letterStatus[props.letter]) {
            return true
        }
    }

    // console.log("Key  props", active)
    // checkState()

    function handleClick(event) {
        // handle click events that will update the letterbox values
        const keyValue = event.nativeEvent.target.innerText; // using this value, populate the coresponding active letterbox
        const current = document.querySelector('.column-1')
        // console.log("Clicking key", keyValue, current, props)
        props.keyClick(keyValue)
        
    }

    // return (
    //     <div className="key" onClick={handleClick}>
    //         <p>{props.letter}</p>
    //     </div>
    // )
    useEffect(() => {
        if(checkState()){
            setStatus(letterStatus[props.letter])
        }
    }, [status])
    return (
        <div>
            {status
            ?<div className={`key key-${status}`} onClick={handleClick}>
                <p>{props.letter}</p>
            </div>
            :<div className="key" onClick={handleClick}>
                <p>{props.letter}</p>
            </div>
            }


        </div>
    )
}

export default Key