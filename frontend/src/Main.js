import React, { Component } from "react";
import logo from "./assets/logo.png";
import bkg_onlyCharacters from "./assets/bkg_onlyCharacters.png";
import _ from "lodash";

export class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numberCurrentPlayers: 0,
      number24HPlayers: 0,
      numberAllTime: 0,
      newsLatest: {}
    };
  }

  getValues = async () => {
    // number latest
    const requestLatest = await fetch(
      `http://${
        process.env.NODE_ENV === "production" ? "46.101.192.180" : "10.0.1.7"
      }:8000/registry/latest/`
    );
    let jsonLatest = await requestLatest.json();
    // number today
    const requestToday = await fetch(
      `http://${
        process.env.NODE_ENV === "production" ? "46.101.192.180" : "10.0.1.7"
      }:8000/registry/today/`
    );
    let jsonToday = await requestToday.json();
    let todayNumbers = jsonToday.map(o => o.playerCount);
    let todayMax = _.max(todayNumbers);
    // number ever
    const requestEver = await fetch(
      `http://${
        process.env.NODE_ENV === "production" ? "46.101.192.180" : "10.0.1.7"
      }:8000/registry/maxEver/`
    );
    let jsonEver = await requestEver.json();
    // news latest
    const requestNewsLetest = await fetch(
      `http://${
        process.env.NODE_ENV === "production" ? "46.101.192.180" : "10.0.1.7"
      }:8000/news/latest/`
    );
    let jsonNewsLetest = await requestNewsLetest.json();

    this.setState({
      numberCurrentPlayers: jsonLatest[0].playerCount,
      number24HPlayers: todayMax,
      numberAllTime: jsonEver.playerCount__max,
      newsLatest: { ...jsonNewsLetest[0] }
    });
  };

  async componentDidMount() {
    console.info("Start");
    this.getValues();
    setInterval(async () => {
      console.info("Update");
      this.getValues();
    }, 11000);
  }

  render() {
    const {
      numberCurrentPlayers,
      number24HPlayers,
      numberAllTime,
      newsLatest
    } = this.state;
    return (
      <div className="main">
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-md-12 mb-4">
              <img src={logo} alt="" className="main__logo" />
            </div>
          </div>

          <div className="row">
            <div className="col-xl-4 col-md-6 mb-4">
              <div className="card border-left-primary shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center text_center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-uppercase mb-1">
                        players right now
                      </div>
                      <div className="big_number mb-0 font-weight-bold text-gray-800">
                        {numberCurrentPlayers}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-md-6 mb-4">
              <div className="card border-left-primary shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center text_center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-uppercase mb-1">
                        24-hour player peak
                      </div>
                      <div className="big_number mb-0 font-weight-bold text-gray-800">
                        {number24HPlayers}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-md-6 mb-4">
              <div className="card border-left-primary shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center text_center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-uppercase mb-1">
                        all-time player peak
                      </div>
                      <div className="big_number mb-0 font-weight-bold text-gray-800">
                        {numberAllTime}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* news */}
            <div className="col-xl-12 col-md-12 mb-4">
              <div className="card border-left-primary shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="h2 font-weight-bold text-uppercase mb-1">
                        {newsLatest.title ? newsLatest.title : ""}
                      </div>
                      <div className="news_text mb-0 mt-3 text-gray-800">
                        {newsLatest.text ? newsLatest.text : ""}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="main__chars_background"
          style={{
            backgroundImage: `url(${bkg_onlyCharacters})`
          }}
        ></div>
      </div>
    );
  }
}
