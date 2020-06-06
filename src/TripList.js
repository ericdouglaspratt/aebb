import React, { useEffect, useRef, useState } from 'react';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import './TripList.css';

function TripList({ activeTrip, onClickTrip, stations, trips }) {
  const [reversedTrips, setReversedTrips] = useState(trips.list);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (activeTrip && scrollRef && scrollRef.current) {
      setTimeout(() => {
        scrollRef.current.scrollIntoView({
          block: 'start',
        });
      }, 0);
    }
  }, [scrollRef]);

  useEffect(() => {
    setReversedTrips(trips.list.map(trip => ({
      ...trip,
      numMissingPhotos: trip.stations.filter(stationId => {
        const station = stations.lookup[stationId];
        return !station.photo && !station.photos;
      }).length
    })).reverse());
  }, [trips]);

  return (
    <div className="TripList">
      {reversedTrips.map(trip => {
        const dateStr = moment(trip.date, 'YYYY-MM-DD').format('MMM D, YYYY');
        const isActive = activeTrip && activeTrip.date.localeCompare(trip.date) === 0;
        return (
          <Button
            className={isActive ? "TripList-trip TripList-trip--active" : "TripList-trip"}
            key={dateStr}
            onClick={() => onClickTrip(trip)}
            ref={isActive ? scrollRef : null}
            size="medium"
          >
            <span className="TripList-date">{dateStr}</span>
            {!!trip.description && <span className="TripList-description">{trip.description}</span>}
            <span className="TripList-stations">
              <span className="TripList-stationsNew">{trip.numNew} new stations</span>
              {` — ${trip.stations.length} total`}
              {/*!!trip.numMissingPhotos && ` — ${trip.numMissingPhotos} missing photos`*/}
            </span>
          </Button>
        );
      })}
    </div>
  );
};

export default TripList;
