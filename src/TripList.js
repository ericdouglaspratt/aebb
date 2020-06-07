import React, { Fragment, useEffect, useRef, useState } from 'react';
import './TripList.css';

import TripButton from './TripButton';

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
              const isActive = activeTrip && activeTrip.date.localeCompare(trip.date) === 0;
              return (
                <TripButton
                  {...trip}
                  isActive={isActive}
                  key={trip.date}
                  onClick={() => onClickTrip(trip)}
                  ref={isActive ? scrollRef : null}
                />
              );
            })}
          </div>
        </Fragment>
      ))}
    </div>
  );
};

export default TripList;
