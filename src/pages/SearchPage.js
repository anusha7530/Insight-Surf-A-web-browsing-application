import React  from 'react';
import './SearchPage.css';
import logo from "../img/logo.png"
import { Link } from 'react-router-dom';
import Search from '../components/Search';
import SearchIcon from '@mui/icons-material/Search';
import DescriptionIcon from '@mui/icons-material/Description';
import ImageIcon from '@mui/icons-material/Image';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import RoomIcon from '@mui/icons-material/Room';
import MoreVertIcon from '@mui/icons-material/MoreVert';


function SearchPage( {activePage , activeImage , openVoiceSearch} ) {
    
  return (
    <div className='searchPage'>
      <div className="search_header">
        <Link to="/">
        <img src={logo} alt="logo" className="search_logo" />
        </Link>
      <div className="search_headerBody">
        <Search hideButtons openVoiceSearch={openVoiceSearch}/>

        <div className="search_options">
          <div className="options_left">
        {!activePage ? ( <div className="option_icon">
              <SearchIcon />
              <Link to="/search/all">All</Link>
            </div>): ( <div className="option_icon first">
              <SearchIcon />
              <Link to="/search/all">All</Link>
            </div>)}

        {!activeImage ? ( <div className="option_icon">
              <ImageIcon />
              <Link to="/search/images">Images</Link>
            </div>): ( <div className="option_icon first">
              <ImageIcon />
              <Link to="/search/images">Images</Link>
            </div>)}
        
            
            
            <div className="option_icon">
              <DescriptionIcon />
              <Link to="/news">News</Link>
            </div>
            <div className="option_icon">
              <LocalOfferIcon />
              <Link to="/shopping">Shopping</Link>
            </div>
            <div className="option_icon">
              <RoomIcon />
              <Link to="/maps">Maps</Link>
            </div>
            <div className="option_icon">
              <MoreVertIcon />
              <Link to="/more">More</Link>
            </div>
          </div>

          <div className="options_right">
          <div className="option_icon">
              <Link to="/settings">Settings</Link>
            </div>
            <div className="option_icon">
              <Link to="/tools">Tools</Link>
            </div>
          </div>
        </div>
      </div>
      </div>

     
      
    </div>
  )
}

export default SearchPage
