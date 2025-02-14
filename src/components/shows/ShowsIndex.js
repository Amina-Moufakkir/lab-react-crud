import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import ErrorMessage from "../errors/ErrorMessage";
import ShowListing from "./ShowListing";

import { filterItems, requestData } from "../../api/fetch";

import "./ShowsIndex.css";

export default function ShowsIndex() {
  const [loadingError, setLoadingError] = useState(false);
  const [shows, setShows] = useState([]);
  const [allShows, setAllShows] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");

  const handleTextChange = (e) => {
    const title = e.target.value;
    const result = title.length ? filterItems(title, allShows) : allShows;
    setSearchTitle(title);
    setShows(result)
  }

  useEffect(() => {
    requestData('GET', 'shows')
      .then((response) => {
        setAllShows(response)
        setShows(response);
        setLoadingError(false);
      })
      .catch((error) => {
        console.log(error)
        setLoadingError(true);
      });
  }, []);


  return (
    <div>
      {loadingError ? (
        <ErrorMessage />
      ) : (
        <section className="shows-index-wrapper">
          <h2>All Shows</h2>
          <button>
            <Link to="/shows/new">Add a new show</Link>
          </button>
          <br />
          <label htmlFor="searchTitle">
            Search Shows:
            <input
              type="text"
              value={searchTitle}
              id="searchTitle"
              onChange={handleTextChange}
            />
          </label>

          <section className="shows-index">
            {shows.map((show) => {
              return <ShowListing {...show} key={show.id} />;
            })}
          </section>
        </section>
      )}
    </div>
  );
}
