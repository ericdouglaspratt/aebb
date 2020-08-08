import React from 'react';
import './RouteMarking.css';

import { calculateDistance } from './helpers';

const RouteMarking = ({ markedRoute, stations }) => {
  const distance = Math.round(markedRoute.reduce((result, stationId, index) => {
    if (index === 0) {
      return result;
    } else {
      const prevStation = stations.lookup[markedRoute[index - 1]];
      const currStation = stations.lookup[stationId];
      return result + calculateDistance(prevStation.lat, prevStation.long, currStation.lat, currStation.long);
    }
  }, 0) * 10) / 10;

  return (
    <div className="RouteMarking">
      <div className="RouteMarking-info">
        Tap stations to create a route
        {!!distance && ` (${distance} mi)`}
      </div>
    </div>
  );
};

export default RouteMarking;
