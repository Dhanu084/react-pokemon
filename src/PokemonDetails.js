import React, { useState, useEffect } from "react";
import axios from "axios";

export default function PokemonDetails(props) {
  const [pokemonName, setPokemonName] = useState(
    props.location.pathname.split("/")[1]
  );
  const [pokemon, setPokemon] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((res) => {
        console.log(res.data.sprites.front_default);
        let data = res.data;
        setPokemon({
          name: pokemonName,
          height: data.height,
          weight: data.weight,
          moves: res.data.moves.splice(0, 5),
          imageurl: data.sprites.front_default,
        });
        setLoading(false);
      });
  }, [pokemonName]);
  console.log(pokemon.moves);
  return (
    <div>
      {loading && <div>Loading !!!</div>}
      <div className="large">
        {!loading && (
          <div className="details card">
            <img src={pokemon.imageurl} />
            <div className="card">
              <div>
                <strong>Name :</strong>
                {pokemonName}
              </div>
              <div>
                <strong>Height :</strong>
                {pokemon.height} feet
              </div>
              <div>
                <strong>Weight :</strong>
                {pokemon.weight} kg
              </div>
            </div>
            <div className="card moves">
              <h4>Top Moves</h4>
              {pokemon.moves.map((p) => (
                <p key={p.move.name}>{p.move.name}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
