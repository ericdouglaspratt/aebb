import React, { useEffect, useState } from 'react';
import moment from 'moment';
import './App.css';

import { VIEWS } from './constants';
import {
  calculateDistance,
  createIdMap,
  createTimeline,
  csvToJson,
  detectStationChanges,
  processRawTrips,
  useStateRef
} from './helpers';
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
const { initialTrips, visitedStations } = processRawTrips(rawTrips, initialStations);

function App() {
  const [activeTravelTimestamp, setActiveTravelTimestamp] = useState(null);
  const [diffLog, setDiffLog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [stations, setStations] = useState(initialStations);
  const [timeline, setTimeline] = useState([]);
  const [trips, setTrips] = useState(initialTrips);
  const [totalNumViableStations, setTotalNumViableStations] = useState(0);

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
    } else if (view === VIEWS.TIME_TRAVEL) {
      setActiveTravelTimestamp(null);
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

  const handleSelectPhoto = (photo, trip) => {
    pushView(VIEWS.PHOTO, {
      photo,
      trip
    });
  };

  const loadCurrentStationData = visitedMap => {
    const stationInfoPromise = fetch('https://gbfs.bluebikes.com/gbfs/en/station_information.json')
      .then(response => response.json())
      .then(data => detectStationChanges(stations.list, data?.data?.stations, visitedMap));

    const stationStatusPromise = fetch('https://gbfs.bluebikes.com/gbfs/en/station_status.json')
      .then(response => response.json())
      .then(data => {
        const stationStatusMap = data.data.stations.reduce((result, station) => {
          result[station.station_id] = {
            bikesAvailable: station.num_bikes_available,
            docksAvailable: station.num_docks_available,
            isInactive: station.station_status !== 'active'
          };
          return result;
        }, {});
        return stationStatusMap;
      });

    Promise.all([stationInfoPromise, stationStatusPromise])
      .then(([stationInfoResult, stationStatusResult]) => {
        const mergedStationList = stationInfoResult.updatedStationList.map(station => ({
          ...station,
          ...(stationStatusResult[station.id])
        }));

        setStations({
          list: mergedStationList,
          lookup: createIdMap(mergedStationList)
        });
        setTimeline(createTimeline(mergedStationList, trips, visitedStations));
        setTotalNumViableStations(mergedStationList.reduce((count, station) => {
          return count + ((visitedStations[station.id] || !station.isInactive) ? 1 : 0);
        }, 0));
        setIsLoading(false);

        // FOR ADDING IN NEW FIRSTSEEN DATA
        /*const cleanList = stationInfoResult.updatedStationList.map(station => {
          const a = {...station};
          delete a.isInactive;
          return a;
        });
        validateStationHistory({
          list: cleanList,
          lookup: createIdMap(cleanList)
        });*/
      })
      .catch(e => {
        setTimeline(createTimeline(initialStations.list, trips, visitedStations));
        setTotalNumViableStations(initialStations.list.reduce((count, station) => {
          return count + ((visitedStations[station.id] || !station.isInactive) ? 1 : 0);
        }, 0));
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
      (view === VIEWS.PHOTOS && prevView === VIEWS.PHOTOS) ||
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
  
  const updateTripDataWithPhotoMarkers = updatedTripList => {
    setTrips({
      list: updatedTripList,
      lookup: createIdMap(updatedTripList)
    });
  };

  const validateStationHistory = stations => {
    fetch('/202011-bluebikes-tripdata.csv')
      .then(response => response.text())
      .then(csv => {
        //console.log('csv', csv);
        const json = csvToJson(csv);

        // OLD FORMAT
        /*json.sort((a, b) => {
          const am = moment(a.Startdate, 'M/D/YYYY H:mm').unix();
          const bm = moment(b.Startdate, 'M/D/YYYY H:mm').unix();
          return am < bm ? -1 : am > bm ? 1 : 0;
        });*/
        //console.log('json', json);

        /*const firstTripTimes = json.reduce((result, trip) => {
          if (trip.Startdate && !result[trip.Startstationnumber]) {
            result[trip.Startstationnumber] = moment(trip.Startdate, 'M/D/YYYY H:mm').unix();
          }
          if (trip.Enddate && !result[trip.Endstationnumber]) {
            result[trip.Endstationnumber] = moment(trip.Enddate, 'M/D/YYYY H:mm').unix();
          }
          return result;
        }, {});
        console.log('first trip times', firstTripTimes);

        const updatedStations = stations.list.map(station => {
          if (firstTripTimes[station.oldId] < station.firstSeen) {
            return {
              ...station,
              firstSeen: firstTripTimes[station.oldId]
            };
          } else {
            return station;
          }
        });

        console.log('update', updatedStations);
        console.log(JSON.stringify(updatedStations));*/

        // NEW FORMAT
        /*const firstTripTimes = json.reduce((result, trip) => {
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

          updatedStations.sort((a, b) => {
            const aid = parseInt(a.id);
            const bia = parseInt(b.id);
            return (aid < bia) ? -1 : ((aid > bia) ? 1 : 0);
          });

          console.log('update', updatedStations);
          console.log(JSON.stringify(updatedStations));
        }*/
      })
      .catch(e => {
        console.log('error fetching station history data', e);
      });
  };

  const viewStack = viewStackRef.current;
  const currentView = viewStack.length > 0 ? viewStack[viewStack.length - 1] : null;
  const oneViewBack = viewStack.length > 1 ? viewStack[viewStack.length - 2] : null;
  const selectedMarker = currentView && currentView.view === VIEWS.PHOTO && currentView.payload.photo && currentView.payload.photo.marker
    ? {
      marker: currentView.payload.photo.marker,
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


  // validate the most recent firstSeen we have
  /*const stationLastSeen = stations.list.reduce((result, station) => {
    if (station.firstSeen && station.firstSeen > result) {
      return station.firstSeen;
    }
    return result;
  }, 0);
  console.log('station last seen', stationLastSeen, new Date(stationLastSeen * 1000));*/

  return (
    <div className="App">
      {isLoading ? (
        <div className="App-loading">
          Loading
        </div>
      ) : (
          <>
            <Map
              activeTravelTimestamp={activeTravelTimestamp}
              activeTrip={activeTrip}
              onClearSelectedStation={handleClearSelectedStation}
              onSelectPhoto={handleSelectPhoto}
              onSelectStation={handleClickStationMarker}
              route={markedRouteRef.current}
              selectedMarker={selectedMarker}
              stations={stations}
              trips={trips}
              updateStationDataWithMarkers={updateStationDataWithMarkers}
              updateTripDataWithPhotoMarkers={updateTripDataWithPhotoMarkers}
              visitedStations={visitedStations}
            />
            <InfoPane
              activeTravelTimestamp={activeTravelTimestamp}
              markedRoute={markedRouteRef.current}
              onClearSelectedStation={handleClearSelectedStation}
              onSelectPhoto={handleSelectPhoto}
              onViewActivate={handleViewActivate}
              onViewDeactivate={handleViewDeactivate}
              onViewReplace={handleViewReplace}
              setActiveTravelTimestamp={setActiveTravelTimestamp}
              stations={stations}
              timeline={timeline}
              totalNumViableStations={totalNumViableStations}
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
