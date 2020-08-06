import React, { Component } from "react";
import logo from "./assets/logo-cof.png";
// import bkg_onlyCharacters from "./assets/cof-bkg.jpg";

const serverAddress =
  process.env.NODE_ENV === "production" ? "46.101.192.180" : "10.0.1.7";

const serverPort = 8003;

export class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      numberCurrentPlayers: 0,
      number24HPlayers: 0,
      numberAllTime: 0,
      newsLatest: {}
    };
  }

  getValues = async () => {
    // number latest
    const requestLatest = await fetch(
      `http://${serverAddress}:${serverPort}/registry/latest/`
    );
    const jsonLatest = await requestLatest.json();

    // max in the last 24 hours
    const request24hours = await fetch(
      `http://${serverAddress}:${serverPort}/registry/max24hours/`
    );
    const json24hours = await request24hours.json();

    // max today
    const requestEver = await fetch(
      `http://${serverAddress}:${serverPort}/registry/maxEver/`
    );
    const jsonEver = await requestEver.json();

    // news latest
    const requestLatestNews = await fetch(
      `http://${serverAddress}:${serverPort}/news/latest/`
    );
    const jsonLatestNews = await requestLatestNews.json();

    this.setState({
      loaded: true,
      numberCurrentPlayers: jsonLatest[0].playerCount,
      number24HPlayers: json24hours.playerCount__max,
      numberAllTime: jsonEver.playerCount__max,
      newsLatest: { ...jsonLatestNews[0] }
    });
  };

  async componentDidMount() {
    this.getValues();
    setInterval(async () => {
      this.getValues();
    }, 11000);
  }

  render() {
    const {
      loaded,
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
                        {!loaded ? "--" : numberCurrentPlayers}
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
                        {!loaded ? "--" : number24HPlayers}
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
                        {!loaded ? "--" : numberAllTime}
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

        {/* <div
          className="main__chars_background"
          style={{
            backgroundImage: `url(${bkg_onlyCharacters})`
          }}
        ></div> */}
      </div>
    );
  }
}
