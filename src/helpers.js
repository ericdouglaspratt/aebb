export const calcPercentChange = (a, b) => Math.abs((b - a) / a) * 100;

export const createStationMap = stations => stations.reduce((result, station) => {
  result[station.id] = station;
  return result;
}, {});

export const diffStations = (oldStations, newStations, visitedStations) => {
  const diffLog = [];
  const oldStationMap = createStationMap(oldStations);
  const newStationsFound = [];
  const updatedStationList = [];

  let changesDetected = false;
  let numLocationChanged = 0;
  let numNameChanged = 0;

  newStations.forEach(newStation => {
    const matchingOldStation = oldStationMap[newStation.id];

    if (!matchingOldStation) {
      // if we discovered a new station
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
  if (newStations.length < oldStations.length) {
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
    //console.log(JSON.stringify(updatedStationList));
  }

  return {
    diffLog,
    updatedStationList
  };
};
