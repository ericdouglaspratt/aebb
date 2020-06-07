import React from 'react';
import moment from 'moment';
import './Photos.css';

const Photos = ({stations, trips}) => {
  const reversedTrips = trips.list.slice().reverse();
  return (
    <div className="Photos">
      {reversedTrips.map(trip => {
        const dateStr = moment(trip.date, 'YYYY-MM-DD').format('MMM D, YYYY');
        return (
          <div className="Photos-day" key={trip.date}>
            <h6 className="Photos-header">
              {dateStr}
            </h6>
            <div className="Photos-dayImages">
              {trip.stations.map((stationId, index) => {
                const station = stations.lookup[stationId];
                let photo = station.photo;
                if (station.photos && station.photos.length > 0) {
                  const match = station.photos.find(photo => photo.date === trip.date);
                  if (match) {
                    photo = match.photo;
                  }
                }

                if (photo) {
                  const className = photo === station.photo ? "Photos-image Photos-image--old" : "Photos-image";
                  return (
                    <div className={className} key={`${trip.date}${photo}${index}`} style={{ backgroundImage: `url(${photo})` }} />
                  );
                } else {
                  return (
                    <div className="Photos-noImage" key={`${stationId}${trip.date}${index}`} />
                  );
                }
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Photos;
