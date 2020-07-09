import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";

export default function PokemonDetails(props) {
  const { match } = props;

  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [moves, setMoves] = useState([]);
  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    const url = `https://pokeapi.co/api/v2/pokemon/${match.params.name}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setDetails(data);
        setMoves(data.moves.splice(0, 5));
        setLoading(false);
      });
  }, [props]);

  return (
    <div className="details-container card">
      {loading && <div>loading!</div>}
      {!loading && (
        <div className="details">
          <div className="left-div ">
            <img
              src={details.sprites ? details.sprites.front_default : ""}
              alt={details.name}
            />
          </div>
          <div className="right-div ">
            <div>Name : {details.name}</div>
            <div>
              height : {details.height} <small>feet</small>
            </div>
            <div>
              Weight : {details.weight} <small>kg</small>
            </div>
            <div>Base_Experience : {details.base_experience}</div>
          </div>
          <div className="moves">
            <label>Top Moves</label>
            {moves.map((m, index) => (
              <div key={index} className="list-group-item">
                {m.move.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
