import React, { useEffect, useState } from 'react';
import moment from 'moment';
import './App.css';

import { VIEWS } from './constants';
import { calculateDistance, createIdMap, csvToJson, diffStations, useStateRef } from './helpers';
import cachedStationData from './data-stations';
import rawTrips from './data-trips';

import InfoPane from './InfoPane';
import Map from './Map';

// create initial stations pair
const initialStations = {
  list: cachedStationData,
  lookup: createIdMap(cachedStationData)
};

// create visited station map and count number of new stations per trip
const visitedStations = {};
let totalSoFar = 0;
const processedTrips = rawTrips.map(trip => {
  let numNew = trip.stations.reduce((result, stationId) => {
    if (!visitedStations[stationId]) {
      visitedStations[stationId] = true;
      return result + 1;
    } else {
      return result;
    }
  }, 0);
  totalSoFar += numNew;
  return {
    ...trip,
    distance: trip.stations.reduce((result, stationId, index) => {
      if (index === 0) {
        return result;
      } else {
        const prevStation = initialStations.lookup[trip.stations[index - 1]];
        const currStation = initialStations.lookup[stationId];
        return result + calculateDistance(prevStation.lat, prevStation.long, currStation.lat, currStation.long);
      }
    }, 0),
    numNew,
    numTotal: Object.keys(trip.stations.reduce((result, stationId) => {
      result[stationId] = true;
      return result;
    }, {})).length,
    percentage: Math.round(totalSoFar * 100 / cachedStationData.length)
  };
});
const trips = {
  list: processedTrips,
  lookup: createIdMap(processedTrips)
};

function App() {
  const [diffLog, setDiffLog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [stations, setStations] = useState(initialStations);

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
    if (
      (viewStack.length > 0) &&
      (viewStack[viewStack.length - 1].view === VIEWS.STATION || viewStack[viewStack.length - 1].view === VIEWS.PHOTO)
    ) {
      popView();
    }
  };

  const handleClickStationMarker = (stationId, marker) => {
    const viewStack = viewStackRef.current;
    if (viewStack.length > 0 && viewStack[viewStack.length - 1].view === VIEWS.ROUTE_MARKING) {
      setMarkedRoute([
        ...markedRouteRef.current,
        stationId
      ]);
    } else {
      pushView(VIEWS.STATION, {
        id: stationId,
        marker,
        moveCenter: false
      });
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

  const handleSelectPhoto = (tripId, thumbUrl, marker) => {
    const trip = trips.lookup[tripId];
    pushView(VIEWS.PHOTO, {
      marker,
      photo: trip.photos.find(photo => photo.thumb === thumbUrl),
      trip
    });
  };

  const loadCurrentStationData = visitedMap => {
    fetch('https://member.bluebikes.com/data/stations.json')
      .then(response => response.json())
      .then(data => {
        const { diffLog, updatedStationList } = diffStations(stations.list, data.stations, visitedMap);
        setDiffLog(diffLog);
        /*const output = updatedStationList.map(item => {
          const a = {
            ...item
          };
          delete a.bikesAvailable;
          delete a.docksAvailable;
          delete a.isInactive;
          return a;
        });
        console.log(JSON.stringify(output));*/
        setStations({
          list: updatedStationList,
          lookup: createIdMap(updatedStationList)
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
    if (
      (view === VIEWS.PHOTO && prevView === VIEWS.PHOTO) ||
      (view === VIEWS.PHOTO && prevView === VIEWS.STATION) ||
      (view === VIEWS.STATION && prevView === VIEWS.STATION) ||
      (view === VIEWS.STATION && prevView === VIEWS.PHOTO) ||
      (view === VIEWS.TRIP_LIST && prevView === VIEWS.TRIP_LIST)
    ) {
      // if we're switching from one station/photo view to another
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
      lookup: createIdMap(updatedStationList)
    });
  };

  const validateStationHistory = stations => {
    fetch('/202006-bluebikes-tripdata.csv')
      .then(response => response.text())
      .then(csv => {
        //console.log('csv', csv);
        const json = csvToJson(csv);
        console.log('json', json);

        const firstTripTimes = json.reduce((result, trip) => {
          if (trip.startstationid && stations.lookup[trip.startstationid] && !stations.lookup[trip.startstationid].firstSeen && !result[trip.startstationid]) {
            result[trip.startstationid] = moment(trip.starttime).unix();
          }
          if (trip.endstationid && stations.lookup[trip.endstationid] && !stations.lookup[trip.endstationid].firstSeen && !result[trip.endstationid]) {
            result[trip.endstationid] = moment(trip.stoptime).unix();
          }
          return result;
        }, {});

        console.log('firstTripTimes', firstTripTimes);

        if (Object.keys(firstTripTimes).length > 0) {
          const updatedStations = stations.list.map(station => {
            if (firstTripTimes[station.id]) {
              return {
                ...station,
                firstSeen: firstTripTimes[station.id]
              };
            } else {
              return station;
            }
          });

          console.log('update', updatedStations);
          console.log(JSON.stringify(updatedStations));
        }
      })
      .catch(e => {
        console.log('error fetching station history data', e);
      });
  };

  const viewStack = viewStackRef.current;
  const currentView = viewStack.length > 0 ? viewStack[viewStack.length - 1] : null;
  const oneViewBack = viewStack.length > 1 ? viewStack[viewStack.length - 2] : null;
  const selectedMarker = currentView && currentView.view === VIEWS.PHOTO && currentView.payload.marker
    ? {
      marker: currentView.payload.marker,
      moveCenter: false
    }
    : currentView && currentView.view === VIEWS.STATION ? currentView.payload : null;
  const activeTrip = currentView && (currentView.view === VIEWS.TRIP_LIST || currentView.view === VIEWS.TRIP)
    ? currentView.payload
    : oneViewBack && (oneViewBack.view === VIEWS.TRIP_LIST || oneViewBack.view === VIEWS.TRIP)
      ? oneViewBack.payload
      : null;
  //const selectedStation = currentView && currentView.view === VIEWS.STATION ? currentView.payload : null;
  //const selectedStationTrips = selectedStation ? trips.list.filter(trip => trip.stations.indexOf(selectedStation.id) > -1) : null;
  //const selectedStationGhostRoutes = selectedStationTrips ? selectedStationTrips.map(trip => trip.stations) : null;

  // on mobile devices - try to grab location again as soon as they update, and give visual indication of recency
  // in trip list, on right side, auto-generate an SVG of what the route looks like
  // fix mobile view-centering padding when selecting a station
  // fix mobile route-centering padding when trip has photos vs. when it doesn't

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
              onSelectPhoto={handleSelectPhoto}
              onSelectStation={handleClickStationMarker}
              route={markedRouteRef.current}
              selectedMarker={selectedMarker}
              stations={stations}
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
