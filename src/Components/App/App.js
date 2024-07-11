import React, {useState} from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResult/SearchResult';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';
function App() {
    const [state, setState]=useState({
      searchResults:[
        
      ],
      playlistName:'Example playlist',
      playlist:[
        
      ]
    }) 
    function addTrack(track){
      const checkduplicate=state.playlist.filter((song)=>song.id === track.id)// lọc ra những track đã có trong playlist nếu mảng này lớn hơn một có nghĩa là track đã có trong playlist
      if(checkduplicate.length<1){
        setState((prev)=>(
          {
            ...prev,
            playlist: [...prev.playlist, track]
          }
        ))
        console.log(track)
      }
    }
    function removeTrack(track){
        setState((prev)=>(
          {
            ...prev,
            playlist: prev.playlist.filter((song) => song.id !== track.id)
          }
        ))
    }
    function updatePlaylistName(name){
      setState((prev)=>
        ({
          ...prev,
          playlistName:name
        })
      )
    }
    function savePlaylist(){
      const trackURIs=state.playlist.map(track=>track.uri)
      Spotify.savePlaylist(state.playlistName, trackURIs).then(()=>{
        setState((prev)=>(
          {
            ...prev,
            playlistName:'New Playlist',
            playlist: []
          }
        ))
      })
    }
    const search = (term)=>{
      Spotify.search(term).then(results=>setState((prev) => ({
        ...prev,
        searchResults: results
      })))
    }
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1> 
        <div className="App">
      {/* <!-- Add a SearchBar component --> */}
          <SearchBar onSearch={search}/>
          <div className="App-playlist">
      {/* <!-- Add a SearchResults component --> <!-- Add a Playlist component --> */}
            <SearchResults searchResults={state.searchResults} onAdd={addTrack}/>
            <Playlist playlist={state.playlist} onRemove={removeTrack} onNameChange={updatePlaylistName} onSave={savePlaylist}/>
          </div>
        </div>
      </div>
    )
  
}

export default App;
