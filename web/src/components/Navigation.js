import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Classes,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
  Icon,
  Menu,
  MenuDivider,
  MenuItem,
  Popover,
  Position
} from "@blueprintjs/core";

function Navigation() {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    getGenres();
  }, []);

  const getGenres = async () => {
    const response = await fetch("http://localhost:5000/api/genres");
    const data = await response.json();
    setGenres(data);
  };
  const gamesMenu = (
    <Menu>
      <Link to="/games">
        <MenuItem icon="th" text="All" />
      </Link>
      <MenuDivider />
      {genres.map(genre => (
        <Link key={genre} to={`/games/${genre}`}>
          <MenuItem text={genre} />
        </Link>
      ))}
    </Menu>
  );
  return (
    // <nav className="navbar navbar-expand-lg navbar-light bg-light">
    //   <Link to="/">
    //     <span className="navbar-brand">GameStats</span>
    //   </Link>
    //   <div className="collapse navbar-collapse" id="navbarSupportedContent">
    //     <ul className="navbar-nav mr-auto">
    //       <li className="nav-item">
    //         <Link to="/games">
    //           <span className="nav-link">Game list</span>
    //         </Link>
    //       </li>
    //       <NavDropdown title="Genre" id="basic-nav-dropdown">
    //         <Link to="/games">
    //           <div className="dropdown-item">All</div>
    //         </Link>
    //         {genres.map(genre => (
    //           <Link key={genre} to={`/games/${genre}`}>
    //             <div className="dropdown-item">{genre}</div>
    //           </Link>
    //         ))}
    //       </NavDropdown>
    //     </ul>
    //   </div>
    // </nav>
    <Navbar className="bp3-dark bg-dark">
      <div className="container">
        <NavbarGroup>
          <Link to="/" className={Classes.MENU_ITEM}>
            <NavbarHeading>
              <Icon className="mr-3" icon="chart" iconSize="24" />
              <strong>GStat</strong>
            </NavbarHeading>
          </Link>
          <NavbarDivider />
          <Link to="/" className={Classes.MENU_ITEM}>
            <Button minimal={true} icon="home" text="Home" />
          </Link>
          <Button minimal={true} icon="document" text="Files" />
          <Popover content={gamesMenu} position={Position.BOTTOM}>
            <Button
              icon="th"
              minimal={true}
              text="Games"
              className={Classes.MENU_ITEM}
            />
          </Popover>
        </NavbarGroup>
      </div>
    </Navbar>
  );
}

export default Navigation;
