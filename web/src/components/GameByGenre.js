import React, { useEffect, useState } from "react";
import Game from "./Game";

export default function GameByGenre({ match }) {
  const [games, setGames] = useState([]);

  useEffect(() => {
    getGames();
  }, [match.params.genre]);

  const getGames = async () => {
    const response = await fetch(
      `http://localhost:5000/api/games?genre=${match.params.genre}`
    );
    const data = await response.json();
    console.log(data);
    setGames(data.game_data);
  };

  return (
    <div>
      <h2 className="my-3">Browsing {match.params.genre} games</h2>
      <div className="row">
        {games.map(game => (
          <Game
            key={game.id}
            title={game.title}
            platform={game.platform}
            release_date={game.release_date}
            publisher={game.publisher}
            genre={game.genre}
            copies_sold={game.copies_sold}
          />
        ))}
      </div>
    </div>
  );
}
