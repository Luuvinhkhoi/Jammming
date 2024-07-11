import React from "react";
import './Playlist.css'
import TrackList from "../TrackList/TrackList";
function Playlist(props){
  function handleNameChange(e){
      props.onNameChange(e.target.value)
  }
  props.playlist.map(track=>console.log(track.uri))  
  return(
      <div className="Playlist">
        <input defaultValue={'New Playlist'} onChange={handleNameChange}></input>
        {/* <!-- Add a TrackList component--> */}
        <TrackList tracks={props.playlist} onRemove={props.onRemove} isRemoval={true}/>
        <button className="Playlist-save" onClick={props.onSave}>SAVE TO SPOTIFY</button>
      </div>
    )
}
export default Playlist