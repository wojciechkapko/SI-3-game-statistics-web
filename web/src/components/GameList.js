import React, { Component } from "react";
import Game from "./Game";
import Pagination from "./Pagination";
import axios from "axios";
import { Button, Card, InputGroup } from "react-bootstrap";
import jwt_decode from "jwt-decode";

class GameList extends Component {
  state = {
    userId: null,
    allGames: 0,
    currentGames: [],
    currentPage: null,
    totalPages: null,
    search: "",
    query: ""
  };

  getUserGames = id => {
    console.log(this.state.userId);
    axios.get(`/api/games?owner_id=${id}&page=1&limit=18`).then(response => {
      const {
        current_page: currentPage = null,
        game_data: currentGames = [],
        amount: allGames = 0,
        total_pages: totalPages = null
      } = response.data;
      console.log(response.data);
      this.setState({ currentPage, currentGames, totalPages, allGames });
    });
  };

  componentDidMount() {
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    console.log(decoded);
    this.setState({ userId: decoded.identity.id });
    let id = decoded.identity.id;
    this.getUserGames(id);
  }

  onPageChanged = game_data => {
    const { currentPage, totalPages, pageLimit } = game_data;
    let requestUrl = "";
    if (this.state.query === "") {
      requestUrl = `/api/games?owner_id=${
        this.state.userId
      }&page=${currentPage}&limit=${pageLimit}`;
    } else {
      requestUrl = `/api/games?owner_id=${
        this.state.userId
      }&page=${currentPage}&limit=${pageLimit}&query=${this.state.query}`;
    }

    axios.get(requestUrl).then(response => {
      const currentGames = response.data.game_data;
      this.setState({ currentPage, currentGames, totalPages });
    });
  };

  searchByTitle = query => {
    axios
      .get(
        `/api/games?owner_id=${
          this.state.userId
        }&page=1&limit=18&query=${query}`
      )
      .then(response => {
        const {
          current_page: currentPage = null,
          game_data: currentGames = [],
          amount: allGames = 0,
          total_pages: totalPages = null
        } = response.data;
        this.setState({ currentPage, currentGames, totalPages, allGames });
        // console.log(this.state.currentPage);
        // console.log(this.state.currentGames);
        // console.log(this.state.totalPages);
        // console.log(this.state.allGames);
      });
  };

  // onPageChanged = game_data => {
  //   const { allGames } = this.state;
  //   const { currentPage, totalPages, pageLimit } = game_data;

  //   const offset = (currentPage - 1) * pageLimit;
  //   const currentGames = allGames.slice(offset, offset + pageLimit);
  //   this.setState({ currentPage, currentGames, totalPages });
  // };
  updateSearch = e => {
    let search = e.target.value;
    this.setState({ search });
  };

  getSearch = e => {
    e.preventDefault();
    let query = this.state.search;
    this.setState({ query });
    this.searchByTitle(query);
    //history.pushState(null, null, `/games?title=${search}`);
  };
  render() {
    const { allGames, currentGames, search } = this.state;

    if (allGames === 0)
      return (
        <div className="row">
          <div className="col-12">
            <h3>No games to display</h3>
          </div>
        </div>
      );

    return (
      <div>
        <div className="row">
          <div className="col-12">
            <form
              onSubmit={this.getSearch}
              className="form-inline mt-3 bp3-dark d-flex"
            >
              <InputGroup
                leftIcon="search"
                intent="primary"
                large={true}
                type="search"
                aria-label="Search"
                onChange={this.updateSearch}
                placeholder="Search..."
                value={search}
              />
              <Button
                className="ml-3"
                text="Submit"
                intent="primary"
                type="submit"
              />
            </form>
            <h1 className="h2 mb-4">Found {allGames} games</h1>
          </div>
        </div>
        <div className="row">
          {currentGames.map(game => (
            <Game
              id={game.id}
              title={game.title}
              platform={game.platform}
              release_date={game.release_date}
              publisher={game.publisher}
              genre={game.genre}
              global_sales={game.global_sales}
              cover={game.cover}
              userId={game.owner_id}
            />
          ))}
        </div>
        <div className="d-flex flex-row py-4 align-items-center">
          <Pagination
            totalRecords={this.state.allGames}
            pageLimit={18}
            pageNeighbours={1}
            onPageChanged={this.onPageChanged}
          />
        </div>
      </div>
    );
  }
}
export default GameList;
