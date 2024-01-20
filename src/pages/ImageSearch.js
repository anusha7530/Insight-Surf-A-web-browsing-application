import React, { useState, useEffect } from "react";
import SearchPage from "./SearchPage";
import "./SearchPage.css";
import { useStateValue } from "../utilities/StateProvider";
import Response from "../utilities/response";

function ImageSearch({openVoiceSearch}) {
  const [{ term }, dispatch] = useStateValue();
  const [start, setStart] = useState(11);
  const [data,setData] = useState(null);

  const apiKey = process.env.REACT_APP_API_KEY;
  const CONTEXT_KEY = process.env.REACT_APP_CONTEXT_KEY;

  // const data = Response;

  const moreImage = async () =>{
      setStart(start + 10);
      fetchData();
  }

  const fetchData = async ()=>{
    setData(null);
      fetch(
          `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${CONTEXT_KEY}&q=${term}&num=10&start=${start}`
      )
      .then(response => response.json())
      .then(result =>{
          setData(result);
      })
  }

  useEffect(() => {
        fetchData();
    }, [term])


  return (
    <div>
      <SearchPage activeImage openVoiceSearch={openVoiceSearch}/>
      {term && (
        <div className="image_results">
          {data?.items.map((item) => (
            <div className="grid_result">
              <a href={item.link} className="image_title">
             { item.pagemap.cse_image ? (item.pagemap?.cse_image?.length > 0 &&
                  item.pagemap?.cse_image[0]?.src && (
                    <img
                      src={
                        item.pagemap?.cse_image?.length > 0 &&
                        item.pagemap?.cse_image[0]?.src
                      }
                      alt="image"
                      className="image_result"
                    />) ) : (
                      <div className="image_result not_found">Could_Not_Load</div>
                    ) 
                  }
                <h2>{item.title}</h2>{" "}
              </a>
            </div>
          ))}
        </div>
      )}
      {term && (
        <div className="more_result" onClick={moreImage}></div>
      )}
    </div>
  );
}

export default ImageSearch;
