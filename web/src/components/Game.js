import React, { useEffect, useState } from "react";
import { Card, Spinner, Elevation, Tag } from "@blueprintjs/core";

// export default class Game extends Component {
//   render() {
//     const { game } = this.props;
//     return (
//       <div className="card game">
//         <div className="image">
//           <img src={game.productImageUrl} />
//         </div>
//         <div className="middle aligned content">
//           <div className="header">
//             <i className="large caret up icon" />
//             <b>49</b>
//           </div>
//           <div className="card-body">
//             <a href="#">{game.title}</a>
//             <p>small</p>
//           </div>
//           <div className="card-footer">
//             <span>Published by: </span>
//             <span className="author">eyong kevin </span>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

const Game = props => {
  const getCover = async () => {
    const response = await fetch(
      `https://chicken-coop.p.rapidapi.com/games/${
        props.title
      }?platform=${props.platform.toLowerCase()}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "chicken-coop.p.rapidapi.com",
          "x-rapidapi-key": "7b330b9b4cmshf90d7b5d0444359p1ee342jsn47d77db27529"
        }
      }
    );
    const gameData = await response.json();
    setGame(gameData.result);
  };
  useEffect(() => {
    getCover();
  }, []);

  const [game, setGame] = useState([]);
  var image;
  if (game == null || game.image == null) {
    image = <Spinner intent="primary" size="35" value={null} />;
  } else {
    image = <img className="bp3-elevation-1 mr-3" src={game.image} alt="" />;
  }
  return (
    <div className="col-4 mb-3">
      <Card elevation={Elevation.ONE} className="game bp3-dark bg-dark">
        <div className="d-flex">
          {image}
          <div className="d-flex flex-column">
            <small className="bp3-text-muted">{props.release_date}</small>
            <h3 className="mt-1">{props.title}</h3>
            <p>Sold: {props.global_sales} m units</p>
            <p>{props.genre}</p>
            <p>{props.platform}</p>
          </div>
        </div>
        <Tag intent="primary" className="mt-3">
          {props.publisher}
        </Tag>
      </Card>
    </div>
  );
};

export default Game;
