import React, {useEffect, useState} from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import './TripList.css';

import moment from 'moment';

import stations from './data-stations';

function TripList({trips, visitedStations}) {
  const [numVisited, setNumVisited] = useState(0);
  const [reversedTrips, setReversedTrips] = useState(trips);

  useEffect(() => {
    setNumVisited(Object.keys(visitedStations).length);
    setReversedTrips(trips.slice().reverse());
  }, [trips, visitedStations]);

  return (
    <div className="TripList">
      <div>Num Visited: {numVisited}</div>
      <div>Num Total: {stations.length}</div>
      <div>Percent Complete: {Math.round((numVisited / stations.length) * 100)}%</div>
      <h4>Trip List</h4>
      <ul>
        {reversedTrips.map(trip => {
          const dateStr = moment(trip.date, 'YYYY-MM-DD').format('MMM D, YYYY');
          return (
            <li key={dateStr}>{dateStr} - {trip.stations.length} stations</li>
          );
        })}
      </ul>
    </div>
  );
};

export default TripList;
