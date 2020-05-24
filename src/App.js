import React, { useEffect, useRef, useState } from 'react';
import './App.css';

import { createStationMap, diffStations } from './helpers';
import cachedStationData from './data-stations';
import trips from './data-trips';

import InfoPane from './InfoPane';
import Map from './Map';
import RouteMarking from './RouteMarking';

function App() {
  const [diffLog, setDiffLog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStationId, setSelectedStationId] = useState('');
  const [stations, setStations] = useState(cachedStationData);
  const [stationMap, setStationMap] = useState({});
  const [visitedStations, setVisitedStations] = useState({});

  const [isRouteMarkingActive, _setIsRouteMarkingActive] = useState(false);
  const isRouteMarkingActiveRef = React.useRef(isRouteMarkingActive);
  const setIsRouteMarkingActive = val => {
    isRouteMarkingActiveRef.current = val;
    _setIsRouteMarkingActive(val);
  };

  const [markedRoute, _setMarkedRoute] = useState([]);
  const markedRouteRef = React.useRef(markedRoute);
  const setMarkedRoute = val => {
    markedRouteRef.current = val;
    _setMarkedRoute(val);
  };

  useEffect(() => {
    // redirect to secure
    if (window.location.protocol === 'http:' && window.location.href.indexOf('localhost') < 0) {
      window.location = 'https://andyandericbikeboston.com';
    }

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

  const handleRouteMarkingActivate = () => {
    setIsRouteMarkingActive(true);
  };

  const handleRouteMarkingDeactivate = () => {
    setIsRouteMarkingActive(false);
    setMarkedRoute([]);
  };

  const handleSelectStation = stationId => {
    console.log('select station', isRouteMarkingActiveRef.current);
    if (isRouteMarkingActiveRef.current) {
      setMarkedRoute([
        ...markedRouteRef.current,
        stationId
      ]);
    } else {
      setSelectedStationId(stationId);
    }
  };

  const loadCurrentStationData = visitedMap => {
    fetch('https://member.bluebikes.com/data/stations.json')
      .then(response => response.json())
      .then(data => {
        const { diffLog, updatedStationList } = diffStations(stations, data.stations, visitedMap);
        setDiffLog(diffLog);
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
            route={markedRoute}
            selectedStationId={selectedStationId}
            stations={stations}
            stationMap={stationMap}
            trips={trips}
            updateStationDataWithMarkers={updateStationDataWithMarkers}
            visitedStations={visitedStations}
          />
          <InfoPane
            diffLog={diffLog}
            isRouteMarkingActive={isRouteMarkingActive}
            onClearSelectedStation={handleClearSelectedStation}
            onRouteMarkingActivate={handleRouteMarkingActivate}
            onRouteMarkingDeactivate={handleRouteMarkingDeactivate}
            selectedStationId={selectedStationId}
            stations={stations}
            stationMap={stationMap}
            trips={trips}
            visitedStations={visitedStations}
          />
          {isRouteMarkingActive && (
            <RouteMarking />
          )}
        </>
      )}
    </div>
  );
}

export default App;
