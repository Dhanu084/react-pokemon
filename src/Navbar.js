import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, BrowserRouter as Router } from "react-router-dom";
import { useLocation } from "react-router";

export default function Navbar(props) {
  const [pokemons, setPokemons] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [searching, setSearching] = useState(false);
  const location = useLocation();
  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=764&offset=200")
      .then((res) => {
        setPokemons(res.data.results);
      });
    return () => {};
  }, []);

  const handleSearch = (value) => {
    if (value.length == 0) {
      setSearching(false);
      return;
    }
    setSearching(true);
    value = value.toLowerCase();
    const filteredArray = pokemons.filter((pokemon) => {
      return pokemon.name.startsWith(value);
    });

    if (filteredArray.length > 0) setSearchResult(filteredArray);
    else setSearchResult([]);
  };

  const handleClick = () => {
    document.getElementById("search-text").value = "";
    setSearchResult([]);
    setSearching(false);
  };

  return (
    <div className="nav">
      <div className="logo">
        <Link to="/">
          <img
            src="https://image.flaticon.com/icons/svg/528/528101.svg"
            alt="pokemon ball"
          />
        </Link>
      </div>
      <div className="search">
        <input
          type="text"
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="poke search"
          id="search-text"
        />
        {searchResult.length > 0 && searching && (
          <div className="search-results">
            <ul>
              {searchResult.map((p, index) => (
                <li key={index}>
                  <Link
                    to={`/pokemon/${p.name}`}
                    key={p.name}
                    onClick={handleClick}
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        {searchResult.length == 0 && searching && (
          <div className="search-results">No pokemon found</div>
        )}
      </div>
    </div>
  );
}
