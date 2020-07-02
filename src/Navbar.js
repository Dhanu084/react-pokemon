import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, BrowserRouter as Router } from "react-router-dom";
export default function Navbar({ setCurrentPageUrl }) {
  const [pokemons, setPokemons] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=764&offset=200")
      .then((res) => {
        setPokemons(res.data.results);
      });
  });

  const handleSearch = (value) => {
    if (value.length == 0) {
      setSearching(false);
      return;
    }
    setSearching(true);
    const filteredArray = pokemons.filter((pokemon) => {
      //console.log(pokemon.name.startsWith(value), pokemon.name);
      return pokemon.name.startsWith(value);
    });

    if (filteredArray.length > 0) setSearchResult(filteredArray);
    else setSearchResult([]);
    return () => {
      setSearching(false);
      setSearchResult([]);
    };
  };

  return (
    <div className="nav">
      <Router>
        <div className="search">
          <input type="text" onChange={(e) => handleSearch(e.target.value)} />
          {searchResult.length > 0 && searching && (
            <div className="search-results">
              <ul>
                {searchResult.map((p) => (
                  <Link to={`/${p.name}`} key={p.name}>
                    <li>{p.name}</li>
                  </Link>
                ))}
              </ul>
            </div>
          )}
          {searchResult.length == 0 && searching && (
            <div className="search-results">No pokemon found</div>
          )}
        </div>
      </Router>
    </div>
  );
}
