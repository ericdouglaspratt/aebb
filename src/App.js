import React, { useEffect, useState } from 'react';
import './App.css';

import { VIEWS } from './constants';
import { createStationMap, diffStations, useStateRef } from './helpers';
import cachedStationData from './data-stations';
import rawTrips from './data-trips';

import InfoPane from './InfoPane';
import Map from './Map';

// create visited station map and count number of new stations per trip
const visitedStations = {};
const trips = rawTrips.map(trip => {
  return {
    ...trip,
    numNew: trip.stations.reduce((result, stationId) => {
      if (!visitedStations[stationId]) {
        visitedStations[stationId] = true;
        return result + 1;
      } else {
        return result;
      }
    }, 0)
  };
});

function App() {
  const [diffLog, setDiffLog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [stations, setStations] = useState({
    list: cachedStationData,
    lookup: createStationMap(cachedStationData)
  });

  const [markedRouteRef, setMarkedRoute] = useStateRef([]);
  const [viewStackRef, setViewStack] = useStateRef([]);

  useEffect(() => {
    // redirect to secure
    if (window.location.protocol === 'http:' && window.location.href.indexOf('localhost') < 0) {
      window.location = 'https://andyandericbikeboston.com';
    }

    // load the current station data
    loadCurrentStationData(visitedStations);
  }, []);

  const handleClearSelectedStation = () => {
    const viewStack = viewStackRef.current;
    if (viewStack.length > 0 && viewStack[viewStack.length - 1].view === VIEWS.STATION) {
      popView();
    }
  };

  const handleViewActivate = (view, payload) => {
    pushView(view, payload);
  };

  const handleViewDeactivate = view => {
    popView();

    if (view === VIEWS.ROUTE_MARKING) {
      setMarkedRoute([]);
    }
  };

  const handleViewReplace = (view, payload) => {
    const viewStack = viewStackRef.current;
    if (viewStack.length > 0 && viewStack[viewStack.length - 1].view === view) {
      setViewStack([
        ...viewStack.slice(0, viewStack.length - 1),
        {
          view,
          payload
        }
      ]);
    }
  };

  const handleSelectStation = stationId => {
    const viewStack = viewStackRef.current;
    if (viewStack.length > 0 && viewStack[viewStack.length - 1].view === VIEWS.ROUTE_MARKING) {
      setMarkedRoute([
        ...markedRouteRef.current,
        stationId
      ]);
    } else {
      pushView(VIEWS.STATION, {
        id: stationId,
        moveCenter: false
      });
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

  const popView = () => {
    const viewStack = viewStackRef.current;
    if (viewStack.length > 0) {
      setViewStack([
        ...viewStack.slice(0, viewStack.length - 1)
      ]);
    }
  };

  const pushView = (view, payload) => {
    const viewStack = viewStackRef.current;
    const prevView = viewStack.length > 0 ? viewStack[viewStack.length - 1].view : null;
    if ((view === VIEWS.STATION && prevView === VIEWS.STATION) || (view === VIEWS.TRIP_LIST && prevView === VIEWS.TRIP_LIST)) {
      // if we're switching from one station view to another
      // or one trip list view to one with a payload
      // pop the old view and push the new view
      setViewStack([
        ...viewStack.slice(0, viewStack.length - 1),
        {
          view,
          payload
        }
      ]);
    } else {
      // push the new view onto the stack
      setViewStack([
        ...viewStackRef.current,
        {
          view,
          payload
        }
      ]);
    }
  };

  const updateStationDataWithMarkers = updatedStationList => {
    setStations({
      list: updatedStationList,
      lookup: createStationMap(updatedStationList)
    });
  };

  const viewStack = viewStackRef.current;
  const currentView = viewStack.length > 0 ? viewStack[viewStack.length - 1] : null;
  const oneViewBack = viewStack.length > 1 ? viewStack[viewStack.length - 2] : null;
  const activeTrip = currentView && (currentView.view === VIEWS.TRIP_LIST || currentView.view === VIEWS.TRIP)
    ? currentView.payload
    : oneViewBack && (oneViewBack.view === VIEWS.TRIP_LIST || oneViewBack.view === VIEWS.TRIP)
    ? oneViewBack.payload
    : null;
  const selectedStation = currentView && currentView.view === VIEWS.STATION ? currentView.payload : null;

  return (
    <div className="App">
      {isLoading ? (
        <div className="App-loading">
          Loading
        </div>
      ) : (
          <>
            <Map
              activeTrip={activeTrip}
              onClearSelectedStation={handleClearSelectedStation}
              onSelectStation={handleSelectStation}
              route={markedRouteRef.current}
              selectedStation={selectedStation}
              stations={stations}
              trips={trips}
              updateStationDataWithMarkers={updateStationDataWithMarkers}
              visitedStations={visitedStations}
            />
            <InfoPane
              onClearSelectedStation={handleClearSelectedStation}
              onViewActivate={handleViewActivate}
              onViewDeactivate={handleViewDeactivate}
              onViewReplace={handleViewReplace}
              stations={stations}
              trips={trips}
              viewStack={viewStackRef.current}
              visitedStations={visitedStations}
            />
          </>
        )}
    </div>
  );
}

export default App;
