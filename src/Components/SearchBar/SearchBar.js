import React,{useState}from 'react'
import './SearchBar.css'

function SearchBar(props){
  const [state, setState]=useState('')
  //mỗi lần người dùng nhập vào ô tìm kiếm sẽ được lưu vào state 
  function search(){
    props.onSearch(state)
  }
  function handleTermChange(e){
    setState(prev=>prev=e.target.value)
  }
  return(
    <div className='SearchBar'>
      <input placeholder='Enter a Song, Album, or Playlist' onChange={handleTermChange}></input>
      <button className='SearchButton' onClick={search}>Search</button>
    </div>
  )
}
export default SearchBar