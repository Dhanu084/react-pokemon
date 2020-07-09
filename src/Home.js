import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Pagination, Pokemon } from "./allPages";

export default function Home(props) {
  useEffect(() => {
    const { pokemons } = props.pokemons;
    var array = [];
    pokemons.map((pokemon) => {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          array.push(data);
        });
    });
  }, []);
  const { pokemons } = props.pokemons;
  const { match } = props;
  const { loading } = props;

  return (
    <div>
      {loading && <div>loading</div>}
      {!loading && (
        <div className="home-container">
          {pokemons.map((pokemon, index) => (
            <Pokemon pokemon={pokemon} index={index} key={index} />
          ))}
          <Pagination
            offset={props.offset}
            changeToPrevious={props.changeToPrevious}
            changeToNext={props.changeToNext}
            previous={props.previous}
            next={props.next}
          />
        </div>
      )}
    </div>
  );
}
