import React, { Component } from "react";
import {
  Button,
  Card,
  InputGroup,
  Form,
  FormControl,
  Spinner
} from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwt_decode from "jwt-decode";

class GameAdd extends Component {
  state = {
    title: "",
    platform: "Platform...",
    userId: null,
    Loading: false
  };

  componentDidMount() {
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    console.log(decoded);
    this.setState({
      userId: decoded.identity.id
    });
  }

  updateTitle = e => {
    let title = e.target.value;
    this.setState({ title });
  };
  updatePlatform = e => {
    let platform = e.target.value;
    this.setState({ platform });
  };

  addGametoDB = async (title, platform) => {
    await axios
      .get(
        `/api/game/add?title=${title}&platform=${platform}&owner_id=${
          this.state.userId
        }`
      )
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
  };

  async onSubmit(title, platform) {
    this.setState({ Loading: true });

    this.addGametoDB(title, platform).then(() => {
      this.setState({ Loading: false });
    });
  }

  addGame = e => {
    e.preventDefault();
    if (this.state.title != "" && this.state.title != " ") {
      this.onSubmit(this.state.title, this.state.platform);
    } else {
      toast.error("Title is required");
    }
  };
  render() {
    return (
      <div className="container">
        <h1 className="h2 mb-4">Add a game</h1>
        <div className="row">
          <div className="col-4">
            <form onSubmit={this.addGame}>
              <Form.Group>
                <InputGroup>
                  <FormControl
                    id="text-input"
                    placeholder="Title..."
                    value={this.state.title}
                    onChange={this.updateTitle}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group controlId="platform">
                <Form.Label>Select Platform</Form.Label>
                <Form.Control
                  as="select"
                  onChange={this.updatePlatform}
                  value={this.state.platform}
                >
                  <option value="Platform...">Platform...</option>
                  <option value="PS1">Playstation 1</option>
                  <option value="PS2">Playstation 2</option>
                  <option value="PS3">Playstation 3</option>
                  <option value="PS4">Playstation 4</option>
                  <option value="XBOX">Xbox</option>
                  <option value="XBOX_360">Xbox 360</option>
                  <option value="XBOX_ONE">Xbox One</option>
                  <option value="NINTENDO_SWITCH">Nintendo Switch</option>
                  <option value="PC">PC</option>
                </Form.Control>
              </Form.Group>
              <div className="d-flex align-items-center">
                <Button variant="primary" type="submit" className="mr-3">
                  Submit
                </Button>

                {this.state.Loading ? (
                  <Spinner animation="border" variant="primary" />
                ) : (
                  ""
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default GameAdd;
