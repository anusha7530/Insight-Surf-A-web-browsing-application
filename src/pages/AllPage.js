import React, { useState, useEffect } from "react";
import SearchPage from "./SearchPage";
import { useStateValue } from "../utilities/StateProvider";
import Response from "../utilities/response";

function AllPage({openVoiceSearch}) {
  const [{ term }, dispatch] = useStateValue();
  const [start, setStart] = useState(11);
  const [data, setData] = useState(null);

  const apiKey = process.env.REACT_APP_API_KEY;
  const CONTEXT_KEY = process.env.REACT_APP_CONTEXT_KEY;

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // const data = Response
  const handleNext = async () => {
    setStart(start + 10);
    fetchData();
  };
  const handlePrev = async () => {
    setStart(start - 10);
    fetchData();
  };

  const fetchData = async () => {
    setData(null);
    fetch(
      `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${CONTEXT_KEY}&q=${term}&num=10&start=${start}`
    )
      .then((response) => response.json())
      .then((result) => {
        setData(result);
      });
  };

  useEffect(() => {
    fetchData();
  }, [term]);

  useEffect(() => {
    document.title = term
      ? `${capitalizeFirstLetter(term)} - InsightSurf`
      : `InsightSurf.com`;
  });

  return (
    <div>
      <SearchPage activePage openVoiceSearch={openVoiceSearch}/>
      {term && (
        <div className="search_results">
          <p className="result_count">
            About {data?.searchInformation.formattedTotalResults} results (
            {data?.searchInformation.formattedSearchTime} seconds) for {term}
          </p>
          {data?.items.map((item) => (
            <div className="result_title">
              <a href={item.link} className="result_link">
                {item.pagemap?.cse_thumbnail?.length > 0 &&
                  item.pagemap?.cse_thumbnail[0]?.src && (
                    <img
                      src={
                        item.pagemap?.cse_thumbnail?.length > 0 &&
                        item.pagemap?.cse_thumbnail[0]?.src
                      }
                      className="result_image"
                      alt="image"
                    />
                  )}
                {item.displayLink} ▶{" "}
              </a>
              <a href={item.link} className="result_head">
                <h2>{item.title}</h2>
              </a>
              <p className="result_snippet">{item.snippet}</p>
            </div>
          ))}
        </div>
      )}
      {term && (
        <div className="next_button">
          <button
            className="buttons"
            onClick={handlePrev}
            disabled={start <= 11}
          >
            &larr; Previous
          </button>
          <button className="buttons" onClick={handleNext}>
            Next &rarr;
          </button>
        </div>
      )}
    </div>
  );
}

export default AllPage;
