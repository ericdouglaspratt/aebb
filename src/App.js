import React, { useEffect, useState } from 'react';
import './App.css';

import { createStationMap, diffStations } from './helpers';
import cachedStationData from './data-stations';
import trips from './data-trips';

import InfoPane from './InfoPane';
import Map from './Map';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStationId, setSelectedStationId] = useState('');
  const [stations, setStations] = useState(cachedStationData);
  const [stationMap, setStationMap] = useState({});
  const [visitedStations, setVisitedStations] = useState({});

  useEffect(() => {
    // determine the visited stations
    const visitedMap = trips.reduce((result, trip) => {
      trip.stations.forEach(stationId => {
        result[stationId] = true;
      });
      return result;
    }, {});
    setVisitedStations(visitedMap);

    // create the initial station map
    setStationMap(createStationMap(cachedStationData));

    // load the current station data
    loadCurrentStationData(visitedMap);
  }, []);

  const handleClearSelectedStation = () => {
    setSelectedStationId('');
  };

  const handleSelectStation = stationId => {
    setSelectedStationId(stationId);
  };

  const loadCurrentStationData = visitedMap => {
    fetch('https://member.bluebikes.com/data/stations.json')
      .then(response => response.json())
      .then(data => {
        const { updatedStationList } = diffStations(stations, data.stations, visitedMap);
        setStations(updatedStationList);
        setStationMap(createStationMap(updatedStationList));
        setIsLoading(false);
      })
      .catch(e => {
        console.log('error fetching current station data', e);
        setIsLoading(false);
      });
  };

  const updateStationDataWithMarkers = updatedStationList => {
    setStations(updatedStationList);
    setStationMap(createStationMap(updatedStationList));
  };

  return (
    <div className="App">
      {isLoading ? (
        <div className="App-loading">
          Loading
        </div>
      ) : (
        <>
          <Map
            onClearSelectedStation={handleClearSelectedStation}
            onSelectStation={handleSelectStation}
            selectedStationId={selectedStationId}
            stations={stations}
            stationMap={stationMap}
            trips={trips}
            updateStationDataWithMarkers={updateStationDataWithMarkers}
            visitedStations={visitedStations}
          />
          <InfoPane
            onClearSelectedStation={handleClearSelectedStation}
            selectedStationId={selectedStationId}
            stations={stations}
            stationMap={stationMap}
            trips={trips}
            visitedStations={visitedStations}
          />
        </>
      )}
    </div>
  );
}

export default App;
