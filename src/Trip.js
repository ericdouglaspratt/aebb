import React from 'react';
import moment from 'moment';
import './Trip.css';

const Trip = ({onClickPhoto, trip}) => {
  const dateStr = moment(trip.date, 'YYYY-MM-DD').format('MMM D, YYYY');

  return (
    <div className="Trip">
      <div className="Trip-details">
        <h4 className="Trip-date">{dateStr}</h4>
        {!!trip.description && <p className="Trip-description">{trip.description}</p>}
        <p className="Trip-stations">{trip.stations.length} stations</p>
      </div>
      {trip.photos && trip.photos.length > 0 && (
        <div className="Trip-photos">
          {trip.photos.map(photo => (
            <button
              className="Trip-photo"
              key={photo.thumb}
              onClick={() => onClickPhoto(photo, trip)}
              style={{ backgroundImage: `url(${photo.thumb})` }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Trip;
