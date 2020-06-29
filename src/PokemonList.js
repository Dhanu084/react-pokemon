import React from "react";

export default function PokemonList({ pokemon, loading, offset }) {
  console.log(offset);
  return (
    <div>
      {loading && <p>loading!!!</p>}
      {!loading && (
        <div className="all-pokemons">
          <div className="pokemon-container">
            {pokemon.map((p, index) => (
              <div className="pokemon card" key={index}>
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                    offset + index
                  }.png`}
                  className="card"
                />
                <div className="pokemon-name">{p.name}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
