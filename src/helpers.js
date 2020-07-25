import { useEffect, useRef, useState } from 'react';
import { BREAKPOINTS } from './constants';

export const calcPercentChange = (a, b) => Math.abs((b - a) / a) * 100;

// from https://www.geodatasource.com/developers/javascript
// unit: 'M' is statute miles (default), 'K' is kilometers, 'N' is nautical miles
export const calculateDistance = (lat1, lon1, lat2, lon2, unit) => {
	if ((lat1 == lat2) && (lon1 == lon2)) {
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
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	}
};

export const createIdMap = items => items.reduce((result, item) => {
  result[item.id] = item;
  return result;
}, {});

export const diffStations = (oldStations, newStations, visitedStations) => {
  const diffLog = [];
  const oldStationMap = createIdMap(oldStations);
  const newStationsFound = [];
  const updatedStationList = [];

  let changesDetected = false;
  let numLocationChanged = 0;
  let numNameChanged = 0;

  newStations.forEach(newStation => {
    const matchingOldStation = oldStationMap[newStation.id];

    if (!matchingOldStation) {
      // if we discovered a new station
      if (newStation.la && newStation.lo) {
        const newStationFound = {
          bikesAvailable: newStation.ba,
          docksAvailable: newStation.da,
          id: newStation.id,
          isInactive: newStation.m,
          name: newStation.s,
          lat: newStation.la,
          long: newStation.lo,
          discovered: (new Date()).getTime()
        };
        newStationsFound.push(newStationFound);
        updatedStationList.push(newStationFound);
        diffLog.push(`new station '${newStation.s}' found`);
      }
    } else if (matchingOldStation.name !== newStation.s) {
      // if a known station changed its name
      diffLog.push(`station ${newStation.id} name changed from "${matchingOldStation.name}" to "${newStation.s}"`);
      updatedStationList.push({
        ...matchingOldStation,
        bikesAvailable: newStation.ba,
        docksAvailable: newStation.da,
        isInactive: newStation.m,
        name: newStation.s
      });
      numNameChanged++;
    } else if (matchingOldStation.lat !== newStation.la || matchingOldStation.long !== newStation.lo) {
      // if a known station changed its location
      const percentChangeLat = calcPercentChange(matchingOldStation.lat, newStation.la);
      const percentChangeLong = calcPercentChange(matchingOldStation.long, newStation.lo);
      const avgPercentChange = (percentChangeLat + percentChangeLong) / 2;
      diffLog.push(`station '${matchingOldStation.name}' location has changed from (${matchingOldStation.lat}, ${matchingOldStation.long}) to (${newStation.la}, ${newStation.lo}), percent change ${avgPercentChange}%`);
      updatedStationList.push({
        ...matchingOldStation,
        bikesAvailable: newStation.ba,
        docksAvailable: newStation.da,
        isInactive: newStation.m,
        lat: newStation.la,
        long: newStation.lo
      });
      numLocationChanged++;
    } else {
      updatedStationList.push({
        ...matchingOldStation,
        bikesAvailable: newStation.ba,
        docksAvailable: newStation.da,
        isInactive: newStation.m
      });
    }
  });

  // find stations that kept the same name but changed ids
  const duplicatedSameNameStations = oldStations.filter(station => !!newStations.find(
    newStation => (station.id !== newStation.id) && (station.name === newStation.s)
  ));
  if (duplicatedSameNameStations.length) {
    diffLog.push(`${duplicatedSameNameStations.length} stations have been duplicated with the same name`);
  } else {
    diffLog.push('no duplicated stations with the same name found');
  }

  // find stations that kept the same location but changed ids
  const duplicatedSameLocationStations = oldStations.filter(station => !!newStations.find(
    newStation => (station.id !== newStation.id) && (station.lat === newStation.la) && (station.long === newStation.lo)
  ));
  if (duplicatedSameLocationStations.length) {
    diffLog.push(`${duplicatedSameLocationStations.length} stations have been duplicated with the same location`);
  } else {
    diffLog.push('no duplicated stations with the same location found');
  }

  // find stations that no longer exist
  const nonexistentStations = oldStations.filter(station => !newStations.find(newStation => station.id === newStation.id));
  if (nonexistentStations.length) {
    let numLegacyStations = 0;

    nonexistentStations.forEach(nonexistentStation => {
      // if we've visited this station, preserve it
      if (visitedStations[nonexistentStation.id]) {
        updatedStationList.push({
          ...nonexistentStation,
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
      return (a.id < b.id) ? -1 : ((a.id > b.id) ? 1 : 0);
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
      return (a.id < b.id) ? -1 : ((a.id > b.id) ? 1 : 0);
    });
    const newList = updatedStationList.map(item => {
      const newItem = {...item};
      delete newItem.bikesAvailable;
      delete newItem.docksAvailable;
      delete newItem.isInactive;
      return newItem;
    })
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
