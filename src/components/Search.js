import React, {useState} from 'react';
import './Search.css';
import MicIcon from '@mui/icons-material/Mic';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useStateValue } from '../utilities/StateProvider';
import { actionTypes } from '../utilities/reducer';

function Search({hideButtons , openVoiceSearch}) {
   const [{term}, dispatch] = useStateValue();
    const [input, setInput] = useState("");

    const navigate = useNavigate();
    const search = e =>{
        e.preventDefault();
        dispatch({
          type :actionTypes.SET_SEARCH_TERM,
          term: input
        })
        navigate('/search/all');
    }
    const alertpop = () =>{
      alert("You don't have any collections yet!")
    }

  return (
    <form className='search'>
      <div className="search_input">
        <SearchIcon className="search_icon" />
        <input value = {input} onChange={e => setInput(e.target.value)} placeholder={term} />
        <MicIcon onClick = {() => openVoiceSearch(navigate)} style={{"cursor" :"pointer"}}/>
      </div>
      { !hideButtons ? (
      <div className='search_buttons'>
        <Button type='submit' onClick={search} variant="outlined">Insight Search</Button>
        <Button variant="outlined" onClick={alertpop}>Collections</Button>
      </div>) : (
      <div className='search_buttonsHidden'>
        <Button type='submit' onClick={search} variant="outlined">Insight Search</Button>
        <Button variant="outlined">Collections</Button>
      </div>
      )}
    </form>
  )
}

export default Search
