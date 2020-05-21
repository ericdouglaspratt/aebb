import React, { useEffect, useState } from 'react';
import './TripList.css';

import ArrowForward from '@material-ui/icons/ArrowForward';
import Button from '@material-ui/core/Button';
import moment from 'moment';

function TripList({ trips, visitedStations }) {
  const [reversedTrips, setReversedTrips] = useState(trips);

  useEffect(() => {
    setReversedTrips(trips.slice().reverse());
  }, [trips, visitedStations]);

  return (
    <div className="TripList">
      <h4>Trip List</h4>
      {reversedTrips.map(trip => {
        const dateStr = moment(trip.date, 'YYYY-MM-DD').format('MMM D, YYYY');
        return (
          <Button
            endIcon={<ArrowForward />}
            key={dateStr}
            size="medium"
          >
            {dateStr} - {trip.stations.length} stations
          </Button>
        );
      })}
    </div>
  );
};

export default TripList;
