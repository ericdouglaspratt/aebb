import React, { useEffect, useRef, useState } from 'react';
import './App.css';

import { VIEWS } from './constants';
import { createStationMap, diffStations, useStateRef } from './helpers';
import cachedStationData from './data-stations';
import trips from './data-trips';

import InfoPane from './InfoPane';
import Map from './Map';
import RouteMarking from './RouteMarking';

function App() {
  const [diffLog, setDiffLog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStationId, setSelectedStationId] = useState('');
  const [stations, setStations] = useState({
    list: cachedStationData,
    lookup: createStationMap(cachedStationData)
  });
  const [stationMap, setStationMap] = useState({});
  const [visitedStations, setVisitedStations] = useState({});

  const [isRouteMarkingActiveRef, setIsRouteMarkingActive] = useStateRef(false);
  const [markedRouteRef, setMarkedRoute] = useStateRef([]);
  const [viewStackRef, setViewStack] = useStateRef([]);

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

    // load the current station data
    loadCurrentStationData(visitedMap);
  }, []);

  const handleClearSelectedStation = () => {
    setSelectedStationId('');
  };

  const handleGoToView = (view, payload) => {
    setViewStack([
      ...viewStackRef.current,
      {
        view,
        payload
      }
    ]);
  };

  const handleRouteMarkingActivate = () => {
    setIsRouteMarkingActive(true);
  };

  const handleRouteMarkingDeactivate = () => {
    setIsRouteMarkingActive(false);
    setMarkedRoute([]);
  };

  const handleSelectStation = stationId => {
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
        const { diffLog, updatedStationList } = diffStations(stations.list, data.stations, visitedMap);
        setDiffLog(diffLog);
        setStations({
          list: updatedStationList,
          lookup: createStationMap(updatedStationList)
        });
        setIsLoading(false);
      })
      .catch(e => {
        console.log('error fetching current station data', e);
        setIsLoading(false);
      });
  };

  const updateStationDataWithMarkers = updatedStationList => {
    setStations({
      list: updatedStationList,
      lookup: createStationMap(updatedStationList)
    });
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
            route={markedRouteRef.current}
            selectedStationId={selectedStationId}
            stations={stations}
            trips={trips}
            updateStationDataWithMarkers={updateStationDataWithMarkers}
            visitedStations={visitedStations}
          />
          <InfoPane
            diffLog={diffLog}
            isRouteMarkingActive={isRouteMarkingActiveRef.current}
            onClearSelectedStation={handleClearSelectedStation}
            onRouteMarkingActivate={handleRouteMarkingActivate}
            onRouteMarkingDeactivate={handleRouteMarkingDeactivate}
            selectedStationId={selectedStationId}
            stations={stations}
            trips={trips}
            visitedStations={visitedStations}
          />
          {isRouteMarkingActiveRef.current && (
            <RouteMarking />
          )}
        </>
      )}
    </div>
  );
}

export default App;
