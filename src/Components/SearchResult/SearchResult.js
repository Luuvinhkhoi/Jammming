import React from "react";
import './SearchResult.css'
import TrackList from "../TrackList/TrackList";
function SearchResults(props){
    return(
      <div className="SearchResults">
        <h2>Results</h2>
        {/* <!--Add a TrackList component --> */}
        <TrackList tracks={props.searchResults} onAdd={props.onAdd} isRemoval={false}/>
      </div>
    )
}
export default SearchResults