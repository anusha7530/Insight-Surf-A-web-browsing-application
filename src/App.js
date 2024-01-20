import React, { useState } from "react";
import Home from "./pages/Home";
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import AllPage from "./pages/AllPage";
import ImageSearch from "./pages/ImageSearch";
import VoiceSearch from "./components/VoiceSearch";
import { recognition } from "./utilities/VoiceRecognition";
import { useStateValue } from './utilities/StateProvider';
import { actionTypes } from './utilities/reducer';

function App() {
  const [{term}, dispatch] = useStateValue();
  const [voiceSearch, setVoiceSearch] = useState(false);
  const [voice, setVoice] = useState("");
  
  const openVoiceSearch = (navigate) => {
    setVoiceSearch(true);
    recognition.start();
    recognition.onresult = (event) =>{
      const {transcript} = event.results[0][0];
      if(transcript !== null || transcript !=="" || transcript !== " "){
          setVoiceSearch(false);
          const search2 = () =>{
            dispatch({
              type :actionTypes.SET_SEARCH_TERM,
              term: transcript
            })
            navigate('/search/all');
        }
        search2();
      }
      else{
        setVoiceSearch(false);
        alert("No voice detetcted");
      }
    }
  }
  
  const closeVoiceSearch = () =>{
    setVoiceSearch(false);
    recognition.stop();
  }
return (
  <div className="app">
    { voiceSearch ? <VoiceSearch openVoiceSearch={openVoiceSearch} closeVoiceSearch={closeVoiceSearch}/> : null}

    <Router>
      <Routes>
        <Route exact path="/search/all" element={<AllPage openVoiceSearch={openVoiceSearch}/>}>
        </Route>
        <Route exact path="/search/images" element={<ImageSearch openVoiceSearch={openVoiceSearch}/>}>
        </Route>
        <Route exact path="/" element={<Home openVoiceSearch={openVoiceSearch} voice={voice} voiceSearch={voiceSearch}/>}>
        </Route>
      </Routes>
    </Router>
    </div>
  );
} 

export default App;
