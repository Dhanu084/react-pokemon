import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Pagination } from "./allPages";
export default function PokemonList({
  pokemon,
  loading,
  offset,
  changeToPrev,
  changeToNext,
  prevPageUrl,
  nextPageUrl,
  page,
}) {
  const [stats, setState] = useState([]);
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [moves, setMoves] = useState([]);
  const [imageurl, setImageUrl] = useState("");

  const pokemonDetail = {
    stats,
    weight,
    height,
    moves,
    imageurl,
  };
  const getPokemon = (name) => {
    let cancel;
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${name}`, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        setState(res.data.stats);
        setWeight(res.data.weight);
        setHeight(res.data.height);
        setMoves(res.data.moves);
        setImageUrl(res.data.sprites.front_default);
        console.log(pokemonDetail, moves, res.data.moves, res.data.height);
      });
    return () => cancel();
  };
  return (
    <div>
      {loading && <p>loading!!!</p>}
      {!loading && (
        <div className="all-pokemons">
          <div className="pokemon-container">
            {pokemon.map((p, index) => (
              <div className="pokemon card" key={index}>
                <Link to={`/${p.name}`}>
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                      offset + index
                    }.png`}
                    className="card"
                    onClick={() => getPokemon(p.name)}
                  />
                </Link>
                <div className="pokemon-name">{p.name}</div>
              </div>
            ))}
          </div>
          <Pagination
            changeToPrev={changeToPrev}
            changeToNext={changeToNext}
            prevPageUrl={prevPageUrl}
            nextPageUrl={nextPageUrl}
            page={page}
          />
        </div>
      )}
    </div>
  );
}
