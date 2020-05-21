import React, {useEffect, useState} from 'react';
import './App.css';

import stations from './data-stations';
import trips from './data-trips';

import Map from './Map';
import TripList from './TripList';

function App() {
  const [visitedStations, setVisitedStations] = useState({});

  useEffect(() => {
    // determine the visited stations
    setVisitedStations(trips.reduce((result, trip) => {
      trip.stations.forEach(stationId => {
        result[stationId] = true;
      });
      return result;
    }, {}));
  }, []);

  return (
    <div className="App">
      <Map
        stations={stations}
        trips={trips}
        visitedStations={visitedStations}
      />
      <TripList
        trips={trips}
        visitedStations={visitedStations}
      />
    </div>
  );
}

export default App;
