import React, { useEffect } from 'react'
import './Home.css'
import { Link } from "react-router-dom";
import AppsIcon from '@mui/icons-material/Apps';
import {Avatar } from '@mui/material';
import logo from '../img/logo.png';
import logo2 from '../img/logo2.png';
import Search from '../components/Search';
import { useStateValue } from '../utilities/StateProvider';


function Home({openVoiceSearch }) {
  const [{term} , dispatch] = useStateValue();

  useEffect(()=>{
    document.title = term ? (`${term}-InsightSurf`) : `InsightSurf.com`;
});
  return (
    <div className='home'> 
      <div className="home_header">
          <div className="headerLeft">
            <Link to='/about'>About</Link>
            <Link to='/store'>Store</Link>
          </div>
          <div className="headerRight">
          <Link to='/bookmarks'>Bookmarks</Link>
          <Link to='/images'>Images</Link>
          <AppsIcon />
          <Avatar className='avatar'/>
          </div>
      </div>
      <div className="home_body">
          <img src={logo2} alt="logo" />
          <img src={logo} alt="logo" />
          <div className="inputContainer">
          <Search openVoiceSearch={openVoiceSearch} />
          </div>
      </div>
    </div>
  )
}

export default Home
