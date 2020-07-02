import React, { useState, useEffect } from "react";
import axios from "axios";
import { PokemonList, PokemonDetails, Navbar } from "./allPages";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

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
    let cancel;
    setLoading(true);
    axios
      .get(currentPageUrl, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        setpokemon(res.data.results);
        setPrevPageUrl(res.data.previous);
        setNextPageUrl(res.data.next);
        setLoading(false);
      });

    return () => {
      cancel();
    };
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
      <Navbar setCurrentPageUrl={setCurrentPageUrl} />
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => {
              {
              }
              return (
                <PokemonList
                  {...props}
                  pokemon={pokemon}
                  loading={loading}
                  offset={offset}
                  changeToPrev={changeToPrev}
                  changeToNext={changeToNext}
                  prevPageUrl={prevPageUrl}
                  nextPageUrl={nextPageUrl}
                  page={page}
                />
              );
            }}
          ></Route>
          <Route to="/:pokemon" component={PokemonDetails} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
