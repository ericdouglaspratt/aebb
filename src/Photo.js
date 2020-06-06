import React from 'react';
import moment from 'moment';
import './Photo.css';

const Photo = ({photo, trip}) => {
  return (
    <a
      className="Photo"
      href={photo.full}
      rel="noopener noreferrer"
      style={{ backgroundImage: `url(${photo.thumb})` }}
      target="_blank"
    >
      <span className="Photo-description">
        {`Photo taken on ${moment(trip.date, 'YYYY-MM-DD').format('MMM D, YYYY')} at latitude ${photo.lat}, longitude ${photo.lng}`}
      </span>
    </a>
  );
};

export default Photo;
