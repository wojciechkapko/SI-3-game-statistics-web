import React from "react";
// import LineChart from "./LineChart";
import DoughnutChart from "./DoughnutChart";
import { Button, Card } from "react-bootstrap";

function Home() {
  return (
    <div>
      <Card className="my-5 p-5 bg-dark">
        <h1 className="d-flex align-items-center">
          <i class="fad fa-chart-bar mr-3 fa-lg" />
          Game Satistics - SI week 3 project
        </h1>
        <hr className="my-4" />
        <p className="lead">
          This is an extended version of the project, made with Flask, ReactJS
          and Charts.js.
        </p>
        <div className="row">
          <div className="col-4">
            <Button
              variant="primary"
              href="https://github.com/wojciechkapko/SI-3-game-statistics-web"
            >
              <i class="fab fa-github fa-lg mr-2" />
              GitHub
            </Button>
          </div>
        </div>
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
