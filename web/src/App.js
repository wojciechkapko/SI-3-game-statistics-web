import React from "react";
import Navigation from "./components/Navigation";
import GameList from "./components/GameList";
import GameByGenre from "./components/GameByGenre";
import Home from "./components/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navigation />
      <div className="container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/games" component={GameList} />
          <Route path="/games/:genre" component={GameByGenre} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
