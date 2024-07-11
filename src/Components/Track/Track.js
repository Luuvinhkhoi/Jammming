import React from "react";
import './Track.css'
function Track(props){
    function renderAction(){
        if(props.isRemoval){
            return <button className="Track-action" onClick={removeTrack}>-</button>
        } else{
            return <button className="Track-action" onClick={addTrack}>+</button>

        }
    }
    function addTrack(){
        props.onAdd(props.track)
    }
    function removeTrack(){
        props.onRemove(props.track)
    }
    return (
        <div className="Track-information">
            <div>
                {/* <h3><!--track name will go here--></h3> */}
                <h3>{props.track.name}</h3>
                {/* <p><!--track artist will go here--> | <!--track album will go here --></p> */}
                <p>{props.track.artist} | {props.track.album}</p>
            </div>
            {/* <button className="Track-action"><!--+ or - will go here--></button> */}
            {renderAction()}
        </div>
    )
}
export default Track