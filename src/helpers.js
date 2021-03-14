import { useEffect, useRef, useState } from 'react';
import moment from 'moment';

import { BREAKPOINTS } from './constants';

export const calcPercentChange = (a, b) => Math.abs((b - a) / a) * 100;

// from https://www.geodatasource.com/developers/javascript
// unit: 'M' is statute miles (default), 'K' is kilometers, 'N' is nautical miles
export const calculateDistance = (lat1, lon1, lat2, lon2, unit) => {
	if ((lat1 === lat2) && (lon1 === lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit==="K") { dist = dist * 1.609344 }
		if (unit==="N") { dist = dist * 0.8684 }
		return dist;
	}
};

export const createIdMap = items => items.reduce((result, item) => {
  result[item.id] = item;
  return result;
}, {});

export const createTimeline = (stations, trips, visitedStations) => {
  const earliestFirstSeen = stations.reduce((result, station) => {
    return station.firstSeen && station.firstSeen < result ? station.firstSeen : result;
  }, 9999999999);

  const months = [];
  const monthIterator = moment(earliestFirstSeen * 1000).endOf('month').subtract(5, 'seconds');
  const now = moment();
  while (monthIterator < now) {
    months.push({
      description: monthIterator.format('MMM YYYY'),
      timestamp: monthIterator.unix(),
      //timestampStr: monthIterator.format('YYYY-MM-DD HH:mm:ss')
    });
    monthIterator.add(1, 'month').endOf('month').subtract(5, 'seconds');
  }

  const timeline = months.map(month => {
    const stationsPresent = stations.filter(station => {
      const stationBegin = station.firstSeen || Math.round(station.discovered / 1000);
      return stationBegin && stationBegin < month.timestamp;
    });
    const numVisited = trips.list.filter(trip => moment(trip.date, 'YYYY-M-DD').unix() < month.timestamp).reduce((sumNew, trip) => {
      return sumNew + trip.numNew;
    }, 0);
    return {
      ...month,
      numStations: stationsPresent.length,
      numVisited,
      percentComplete: Math.round((numVisited / stationsPresent.length) * 100)
    };
  });

  timeline.push({
    description: now.format('MMM YYYY'),
    timestamp: now.unix(),
    numStations: stations.filter(station => visitedStations[station.id] || !station.isInactive).length,
    numVisited: trips.list.reduce((sumNew, trip) => {
      return sumNew + trip.numNew;
    }, 0)
  });

  return timeline;
};

export const csvToJson = csv => {
  var lines=csv.split("\n");
  var result = [];
  var headers=lines[0].split(",").map(header => header.replace(/\s/g, '').replace(/\"/g, ''));

  for(var i=1;i<lines.length;i++){
	  var obj = {};
	  var currentline=lines[i].split(",");
	  for(var j=0;j<headers.length;j++){
      obj[headers[j]] = currentline[j] ? currentline[j].replace(/\"/g, '') : currentline[j];
	  }
	  result.push(obj);
  }

  return result;
};

export const detectStationChanges = (oldStations, newStations, visitedStations) => {
  const diffLog = [];
  const oldStationMap = createIdMap(oldStations);
  const newStationsFound = [];
  const updatedStationList = [];

  let changesDetected = false;
  let numLocationChanged = 0;
  let numNameChanged = 0;

  newStations.forEach(newStation => {
    const matchingOldStation = oldStationMap[newStation.station_id];

    if (!matchingOldStation) {
      // if we discovered a new station
      if (newStation.lat && newStation.lon) {
        const newStationFound = {
          hashId: newStation.external_id,
          id: newStation.station_id,
          name: newStation.name,
          lat: newStation.lat,
          long: newStation.lon,
          discovered: (new Date()).getTime()
        };
        newStationsFound.push(newStationFound);
        updatedStationList.push(newStationFound);
        diffLog.push(`new station '${newStation.name}' found`);
      }
    } else if (matchingOldStation.name !== newStation.name) {
      // if a known station changed its name
      diffLog.push(`station ${newStation.station_id} name changed from "${matchingOldStation.name}" to "${newStation.name}"`);
      updatedStationList.push({
        ...matchingOldStation,
        name: newStation.name,
        id: `${matchingOldStation.id}`
      });
      numNameChanged++;
    } else if (matchingOldStation.lat !== newStation.lat || matchingOldStation.long !== newStation.lon) {
      // if a known station changed its location
      const percentChangeLat = calcPercentChange(matchingOldStation.lat, newStation.lat);
      const percentChangeLong = calcPercentChange(matchingOldStation.long, newStation.lon);
      const avgPercentChange = (percentChangeLat + percentChangeLong) / 2;
      diffLog.push(`station '${matchingOldStation.name}' location has changed from (${matchingOldStation.lat}, ${matchingOldStation.long}) to (${newStation.lat}, ${newStation.lon}), percent change ${avgPercentChange}%`);
      updatedStationList.push({
        ...matchingOldStation,
        lat: newStation.lat,
        long: newStation.lon,
        id: `${matchingOldStation.id}`
      });
      numLocationChanged++;
    } else {
      updatedStationList.push({
        ...matchingOldStation,
        hashId: newStation.external_id,
        id: `${matchingOldStation.id}`
      });
    }
  });

  // find stations that kept the same name but changed ids
  const duplicatedSameNameStations = oldStations.filter(station => !!newStations.find(
    newStation => (station.id != newStation.station_id) && (station.name === newStation.name)
  ));
  if (duplicatedSameNameStations.length) {
    diffLog.push(`${duplicatedSameNameStations.length} stations have been duplicated with the same name`);
  } else {
    diffLog.push('no duplicated stations with the same name found');
  }

  // find stations that kept the same location but changed ids
  const duplicatedSameLocationStations = oldStations.filter(station => !!newStations.find(
    newStation => (station.id != newStation.station_id) && (station.lat === newStation.lat) && (station.long === newStation.lon)
  ));
  if (duplicatedSameLocationStations.length) {
    diffLog.push(`${duplicatedSameLocationStations.length} stations have been duplicated with the same location`);
  } else {
    diffLog.push('no duplicated stations with the same location found');
  }

  // find stations that no longer exist
  const nonexistentStations = oldStations.filter(station => !newStations.find(newStation => station.id == newStation.station_id));
  if (nonexistentStations.length) {
    let numLegacyStations = 0;

    nonexistentStations.forEach(nonexistentStation => {
      // if we've visited this station, preserve it
      if (visitedStations[nonexistentStation.id]) {
        updatedStationList.push({
          ...nonexistentStation,
          id: `${nonexistentStation.id}`,
          isInactive: true,
          isLegacy: true
        });
        numLegacyStations++;
      }
    });

    diffLog.push(`${numLegacyStations} legacy stations have been preserved`);
    diffLog.push(`${nonexistentStations.length - numLegacyStations} stations have been removed`);
  }

  // summary report on new stations found
  if (newStationsFound && newStationsFound.length > 0) {
    updatedStationList.sort((a, b) => {
      const aid = parseInt(a.id);
      const bia = parseInt(b.id);
      return (aid < bia) ? -1 : ((aid > bia) ? 1 : 0);
    });
    diffLog.push(`${newStationsFound.length} new stations found`);
    changesDetected = true;
  } else {
    diffLog.push('no new stations found');
  }

  // summary report on name changes detected
  if (numNameChanged > 0) {
    diffLog.push(`${numNameChanged} station name changes detected`);
    changesDetected = true;
  } else {
    diffLog.push('no station name changes detected');
  }

  // summary report on location changes detected
  if (numLocationChanged > 0) {
    diffLog.push(`${numLocationChanged} station location changes detected`);
    changesDetected = true;
  } else {
    diffLog.push('no station location changes detected');
  }

  if (changesDetected) {
    diffLog.forEach(log => console.log(log));
    /*updatedStationList.sort((a, b) => {
      const aid = parseInt(a.id);
      const bia = parseInt(b.id);
      return (aid < bia) ? -1 : ((aid > bia) ? 1 : 0);
    });
    const newList = updatedStationList.map(item => {
      const newItem = {...item};
      delete newItem.bikesAvailable;
      delete newItem.docksAvailable;
      delete newItem.isInactive;
      return newItem;
    })
    console.log('new list of stations', newList);
    console.log(JSON.stringify(newList));*/
  }

  return {
    diffLog,
    updatedStationList
  };
};

export const indexOfMax = (arr) => {
  if (arr.length === 0) {
    return -1;
  }

  var max = arr[0];
  var maxIndex = 0;

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      maxIndex = i;
      max = arr[i];
    }
  }

  return maxIndex;
};

// create visited station map and count number of new stations per trip
export const processRawTrips = (rawTrips, initialStations) => {
  const visitedStations = {};
  let totalSoFar = 0;

  const processedTrips = rawTrips.map(trip => {
    let numNew = trip.stations.reduce((result, stationId) => {
      if (!visitedStations[stationId]) {
        visitedStations[stationId] = moment(trip.date, 'YYYY-MM-DD').unix();
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
      percentage: Math.round(totalSoFar * 100 / initialStations.list.length)
    };
  });

  return {
    initialTrips: {
      list: processedTrips,
      lookup: createIdMap(processedTrips)
    },
    visitedStations
  };
};

export const useBreakpoint = () => useMedia(
  ['(max-width: 767px)', '(min-width: 768px)'],
  [BREAKPOINTS.MOBILE, BREAKPOINTS.DESKTOP],
  BREAKPOINTS.MOBILE
);

export const useMedia = (queries, values, defaultValue) => {
  // Array containing a media query list for each query
  const mediaQueryLists = queries.map(q => window.matchMedia(q));

  // Function that gets value based on matching media query
  const getValue = () => {
    // Get index of first media query that matches
    const index = mediaQueryLists.findIndex(mql => mql.matches);
    // Return related value or defaultValue if none
    return typeof values[index] !== 'undefined' ? values[index] : defaultValue;
  };

  // State and setter for matched value
  const [value, setValue] = useState(getValue);

  useEffect(
    () => {
      // Event listener callback
      // Note: By defining getValue outside of useEffect we ensure that it has ...
      // ... current values of hook args (as this hook callback is created once on mount).
      const handler = () => setValue(getValue);
      // Set a listener for each media query with above handler as callback.
      mediaQueryLists.forEach(mql => mql.addListener(handler));
      // Remove listeners on cleanup
      return () => mediaQueryLists.forEach(mql => mql.removeListener(handler));
    },
    [] // Empty array ensures effect is only run on mount and unmount
  );

  return value;
};

export const useStateRef = (defaultValue) => {
  const [value, _setValue] = useState(defaultValue);
  const valueRef = useRef(value);
  const setValue = val => {
    valueRef.current = val;
    _setValue(val);
  };
  return [valueRef, setValue];
};

export const validateStationHistory = stations => {
  fetch('/202102-bluebikes-tripdata.csv')
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
