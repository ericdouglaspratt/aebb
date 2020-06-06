import React, { Fragment, useEffect, useRef, useState } from 'react';
import Button from '@material-ui/core/Button';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Room from '@material-ui/icons/Room';
import moment from 'moment';
import './TripList.css';

function TripList({ activeTrip, onClickTrip, stations, trips }) {
  const [years, setYears] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (activeTrip) {
      setTimeout(() => {
        if (scrollRef && scrollRef.current) {
          scrollRef.current.scrollIntoView({
            block: 'start',
          });
        }
      }, 0);
    }
  }, [scrollRef]);

  useEffect(() => {
    const reversedTrips = trips.list.slice().reverse();
    const yearMap = reversedTrips.reduce((result, trip) => {
      const year = trip.date.substring(0, 4);
      if (!result[year]) {
        result[year] = {
          trips: [],
          year
        };
      }
      result[year].trips.push(trip);
      return result;
    }, {});
    setYears(Object.keys(yearMap).sort().reverse().map(year => yearMap[year]));
  }, [trips]);

  return (
    <div className="TripList">
      {years.map(year => (
        <Fragment key={year.year}>
          <h6 className="TripList-yearHeader">
            {year.year}
          </h6>
          <div className="TripList-yearTrips">
            {year.trips.map(trip => {
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
                  <span className="TripList-stats">
                    <span className="TripList-stat">
                      <Room />
                      <span className="TripList-stationsNew">
                        {` ${trip.numNew} new`}
                      </span>
                      {` / ${trip.stations.length} total`}
                    </span>
                    {trip.photos && trip.photos.length > 0 && (
                      <span className="TripList-stat TripList-statPhotos">
                        <PhotoCamera />
                        {trip.photos.length === 1 ? ` ${trip.photos.length} photo` : ` ${trip.photos.length} photos`}
                      </span>
                    )}
                  </span>
                </Button>
              );
            })}
          </div>
        </Fragment>
      ))}
    </div>
  );
};

export default TripList;
