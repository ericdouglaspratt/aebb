import React from 'react';
import Button from '@material-ui/core/Button';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Room from '@material-ui/icons/Room';
import SquareFoot from '@material-ui/icons/SquareFoot';
import moment from 'moment';
import './TripButton.css';

const TripButton = React.forwardRef((
  {
    condensed,
    date,
    description,
    distance,
    hideDistance,
    hidePhotos,
    hideStations,
    isActive,
    numNew,
    onClick,
    photos,
    stations
  },
  ref
) => {
  const numPhotos = photos && photos.length;
  const numTotal = stations.length;
  return (
    <Button
      className={`TripButton ${isActive ? 'TripButton--active' : ''} ${condensed ? 'TripButton--condensed' : ''} `}
      onClick={onClick}
      ref={ref}
      size="medium"
    >
      <span className="TripButton-date">
        {moment(date, 'YYYY-MM-DD').format('MMM D, YYYY')}
      </span>
      {!!description && <span className="TripButton-description">{description}</span>}
      <span className="TripButton-stats">
        {!hideStations && (
          <span className="TripButton-stat">
            <Room />
            <span className="TripButton-stationsNew">
              {` ${numNew} new`}
            </span>
            {` / ${numTotal} total`}
          </span>
        )}
        {!hideDistance && (
          <span className="TripButton-stat TripButton-statDistance">
            <SquareFoot />
            {`${Math.round(distance * 10) / 10} mi`}
          </span>
        )}
        {!hidePhotos && !!numPhotos && (
          <span className="TripButton-stat TripButton-statPhotos">
            <PhotoCamera />
            {numPhotos === 1 ? ` ${numPhotos} photo` : ` ${numPhotos} photos`}
          </span>
        )}
      </span>
    </Button>
  );
});

export default TripButton;
