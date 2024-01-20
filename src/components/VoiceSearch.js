import React from 'react'
import "./VoiceSearch.css"
import CloseIcon from '@mui/icons-material/Close';
import MicIcon from '@mui/icons-material/Mic';
import video from "../img/video.mp4";


const VoiceSearch = ({closeVoiceSearch}) => {
  return (
    <div className="voice_search">
      <div className="voice_head">
          <div className="header">
            <h3>Voice Search</h3>
            <CloseIcon onClick={() => closeVoiceSearch()}/>
          </div>
          <div className="header second">
            <div className="icon">
            <MicIcon className='mic' />
            </div>
          </div>
            <video className='video1' autoPlay muted loop>
            <source src={video} type="video/mp4" />
            </video>
      </div>
    </div>
  )
}

export default VoiceSearch
