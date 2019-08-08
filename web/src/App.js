import React from "react";
import Navigation from "./components/Navigation";
import GameList from "./components/GameList";
import GameByGenre from "./components/GameByGenre";
import Home from "./components/Home";
import GameAdd from "./components/GameAdd";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { toast } from "react-toastify";

function App() {
  toast.configure({
    autoClose: 5000
  });
  return (
    <Router>
      <Navigation />
      <div className="container pt-3">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/add/game" component={GameAdd} />
          <Route exact path="/games" component={GameList} />
          <Route path="/games/:genre" component={GameByGenre} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
