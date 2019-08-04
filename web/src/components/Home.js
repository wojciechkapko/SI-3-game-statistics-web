import React from "react";
// import LineChart from "./LineChart";
import DoughnutChart from "./DoughnutChart";
import { Icon, Card, Elevation, AnchorButton } from "@blueprintjs/core";

function Home() {
  return (
    <div>
      <Card elevation={Elevation.ONE} className="bp3-dark my-5 p-5 bg-dark">
        <h1 className="d-flex align-items-center">
          <Icon className="mr-3" icon="chart" iconSize="36" />
          Game Satistics - SI week 3 project
        </h1>
        <hr className="my-4" />
        <p className="lead">
          This is an extended version of the project, made with Flask, ReactJS
          and Charts.js.
        </p>
        <AnchorButton
          href="https://github.com/wojciechkapko/SI-3-game-statistics-web"
          className="mt-3"
          icon="git-branch"
          text="GitHub"
          intent="primary"
        />
      </Card>
      <div className="row">
        <div className="col-12 mb-3">{/* <LineChart id={"0"} /> */}</div>
        <div className="col-12 mb-3">
          <DoughnutChart id={"1"} />
        </div>
        {/* <div className="col-6">
          <Chart />
        </div> */}
      </div>
    </div>
  );
}

export default Home;
