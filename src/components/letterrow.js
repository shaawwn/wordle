import {React, useState, useEffect} from 'react';
import LetterBox from './letterbox.js';
function Row(props) {
    // Row containing either empty letters, currently typed letters, or completed gueses
    // props: id (row id number)
    const [activeRow, setactiveRow] = useState(false) // if row is active, letters will appear as typed
    

    useEffect(() => {

    }, []) // no need to refresh page, AT ALL, just updated the contents of letterbox
    
    return(
        // create a letter box with id using row ID# plus column# (should result in unique ids)
        <div className="row" id={props.id}>
            <LetterBox row={`row-${props.id}`} column="col-0"/>
            <LetterBox row={`row-${props.id}`} column="col-1"/>
            <LetterBox row={`row-${props.id}`} column="col-2"/>
            <LetterBox row={`row-${props.id}`} column="col-3"/>
            <LetterBox row={`row-${props.id}`} column="col-4"/>
        </div>
    )
}

export default Row;