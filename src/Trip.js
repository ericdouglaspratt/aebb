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
        <div className="Trip-stats">
          <div className="Trip-stat">
            <span className="Trip-statStationsNew">
              {` ${trip.numNew} new ${trip.numNew === 1 ? 'station' : 'stations'}`}
            </span>
            {` / ${trip.numTotal} total`}
          </div>
          <div className="Trip-stat">
            {`${Math.round(trip.distance * 10) / 10} mi`}
          </div>
        </div>
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
