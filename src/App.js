import React, { useState, useEffect } from "react";
import axios from "axios";
import PokemonList from "./PokemonList";
import Pagination from "./Pagination";

function App() {
  const [pokemon, setpokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20"
  );
  const [prevPageUrl, setPrevPageUrl] = useState("");
  const [nextPageUrl, setNextPageUrl] = useState("");
  const [offset, setOffset] = useState(1);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    axios.get(currentPageUrl).then((res) => {
      setpokemon(res.data.results);
      setPrevPageUrl(res.data.previous);
      setNextPageUrl(res.data.next);
      setLoading(false);
    });
  }, [currentPageUrl]);

  const changeToPrev = () => {
    setOffset((prevOffset) => {
      return prevOffset - 20;
    });
    setPage((prevPage) => {
      return prevPage + 1;
    });
    setCurrentPageUrl(prevPageUrl);
  };

  const changeToNext = () => {
    setOffset((prevOffset) => {
      return prevOffset + 20;
    });
    setPage((prevPage) => {
      return prevPage + 1;
    });
    setCurrentPageUrl(nextPageUrl);
  };

  return (
    <div className="App">
      <PokemonList pokemon={pokemon} loading={loading} offset={offset} />
      <Pagination
        changeToPrev={changeToPrev}
        changeToNext={changeToNext}
        prevPageUrl={prevPageUrl}
        nextPageUrl={nextPageUrl}
        page={page}
      />
    </div>
  );
}

export default App;
