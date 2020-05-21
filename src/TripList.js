import React, {useEffect, useState} from 'react';
import './TripList.css';

import moment from 'moment';

function TripList({trips, visitedStations}) {
  const [reversedTrips, setReversedTrips] = useState(trips);

  useEffect(() => {
    setReversedTrips(trips.slice().reverse());
  }, [trips, visitedStations]);

  return (
    <div className="TripList">
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
