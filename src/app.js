import React, { Component } from "react";

import 'app.scss';

class App extends Component {
  render() {
    return (
      <div className="Layout">
        <h1 className="HeaderMobile">Andy and Eric Bike Boston</h1>
        <div id="map-canvas" />
        <div className="InfoPane">
          <h1 className="InfoPane-header">Andy and Eric Bike Boston</h1>
          <div className="ProgressBar">
            <div className="ProgressBar-bar">
              <div className="ProgressBar-completed">
                <span className="ProgressBar-report">
                  <span className="ProgressBar-percentage" />
                  <span className="ProgressBar-stationsComplete" />
                </span>
              </div>
            </div>
            <div className="ProgressBar-axis">
              <span className="ProgressBar-min">0</span>
              <span className="ProgressBar-max" />
            </div>
          </div>
          <div className="TripHistory" />
        </div>
      </div>
    );
  }
}

export default App;
