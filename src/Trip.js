import React from 'react';
import moment from 'moment';
import './Trip.css';

const Trip = ({trip}) => {
  const dateStr = moment(trip.date, 'YYYY-MM-DD').format('MMM D, YYYY');

  return (
    <div className="Trip">
      <h4 className="Trip-date">{dateStr}</h4>
      {!!trip.description && <p className="Trip-description">{trip.description}</p>}
      <p className="Trip-stations">{trip.stations.length} stations</p>
    </div>
  );
};

export default Trip;
