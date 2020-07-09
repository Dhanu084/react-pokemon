import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Pokemon(props) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const { pokemon } = props;

  useEffect(() => {
    const hurl = `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`;
    setLoading(true);
    fetch(hurl)
      .then((Response) => Response.json())
      .then((data) => {
        //console.log(data);
        setUrl(data.sprites.front_default);
        setLoading(false);
      });
  }, [pokemon]);

  return (
    <div className="card pokemon-container">
      {!loading}
      <div className="pokemon-image">
        <img src={url} />
      </div>
      <div>
        <Link to={`/pokemon/${pokemon.name}`}>{pokemon.name}</Link>
      </div>
    </div>
  );
}
