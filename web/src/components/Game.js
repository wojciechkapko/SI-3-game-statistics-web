import React, { Component } from "react";
import { Button, Card, InputGroup, Badge, Spinner } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

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

class Game extends Component {
  constructor(props) {
    super(props);
    this.id = props.id;
    this.userId = props.userId;
    this.key = props.key;
    this.title = props.title;
    this.platform = props.platform;
    this.release_date = props.release_date;
    this.publisher = props.publisher;
    this.genre = props.genre;
    this.global_sales = props.global_sales;
    this.cover = props.cover;
  }
  removeGameFromDB(e) {
    e.preventDefault();
    axios
      .get(`/api/game/delete?game_id=${this.id}&owner_id=${this.userId}`)
      .then(response => {
        const {
          message: message = "no message",
          type: type = "error"
        } = response.data;
        console.log(response);
        if (type != "error") {
          toast.success(message);
        } else {
          toast.error(message);
        }
      });
  }
  render() {
    return (
      <div className="col-4 mb-5">
        <Card className="game bg-transparent border-0">
          <div className="d-flex">
            <div className="d-flex flex-column">
              <a
                class="badge badge-danger"
                href="javascript:void(0)"
                onClick={this.removeGameFromDB.bind(this)}
              >
                <i class="fas fa-trash mr-2" />
                Delete
              </a>
              <img class="shadow" src={this.cover} alt="" />
              <span className="badge badge-primary rounded-0">
                {this.platform.toUpperCase()}
              </span>
            </div>

            <div className="d-flex flex-column px-4">
              <small className="bp3-text-muted">{this.release_date}</small>
              <h4>{this.title}</h4>
              <p>Sold: {this.global_sales} m units</p>
              <p>{this.genre}</p>
            </div>
          </div>
          <Badge intent="primary" className="mt-3">
            {this.publisher}
          </Badge>
        </Card>
      </div>
    );
  }
}

export default Game;
