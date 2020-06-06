import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import './Stats.css';

import {indexOfMax} from './helpers';
import StatsChart from './StatsChart';

const Stats = ({ onClickStation, stations, trips }) => {
  const [averageStationsPerTrip, setAverageStationsPerTrip] = useState(0);
  const [dayOfWeekFrequencies, setDayOfWeekFrequencies] = useState([]);
  const [monthFrequencies, setMonthFrequencies] = useState([]);
  const [stationsPerTripFrequencies, setStationsPerTripFrequencies] = useState([]);
  const [topDayOfWeek, setTopDayOfWeek] = useState({});
  const [topMonth, setTopMonth] = useState({});
  const [topStations, setTopStations] = useState([]);
  const [topStationsPerTrip, setTopStationsPerTrip] = useState(0);

  useEffect(() => {
    if (trips && trips.list.length > 0) {
      // calculate average stations per trip
      const totalStationVisits = trips.list.reduce((result, trip) => result + trip.stations.length, 0);
      setAverageStationsPerTrip(Math.round(totalStationVisits / trips.list.length));

      // calculate stations per trip
      const stationsPerTripMap = {};
      trips.list.forEach(trip => {
        if (stationsPerTripMap[trip.stations.length]) {
          stationsPerTripMap[trip.stations.length]++;
        } else {
          stationsPerTripMap[trip.stations.length] = 1;
        }
      });
      setStationsPerTripFrequencies(Object.keys(stationsPerTripMap).map(stationsPerTrip => ({
        stationsPerTrip,
        numTrips: stationsPerTripMap[stationsPerTrip]
      })));

      // calculate top stations per trip
      setTopStationsPerTrip(Math.max(...Object.keys(stationsPerTripMap)));

      // calculate top stations
      const stationVisitMap = trips.list.reduce((result, trip) => {
        trip.stations.forEach(stationId => {
          if (result[stationId]) {
            result[stationId]++;
          } else {
            result[stationId] = 1;
          }
        });
        return result;
      }, {});
      const stationVisits = Object.keys(stationVisitMap).map(id => ({
        ...stations.lookup[id],
        id,
        numVisits: stationVisitMap[id]
      }));
      stationVisits.sort((a, b) => {
        return a.numVisits > b.numVisits ? -1 : a.numVisits < b.numVisits ? 1 : 0;
      });
      setTopStations(stationVisits.slice(0, 4));

      // calculate top months
      const months = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      trips.list.forEach(trip => {
        const index = moment(trip.date, 'YYYY-MM-DD').month();
        months[index]++;
      });
      setMonthFrequencies(months.map((numTrips, index) => ({
        month: index + 1,
        numTrips
      })));

      // calculate top month
      const topMonthIndex = indexOfMax(months);
      setTopMonth({
        month: moment(`2020-${topMonthIndex + 1}-01`, 'YYYY-M-DD').format('MMM'),
        numTrips: months[topMonthIndex]
      });

      // calculate top days of week
      const daysOfWeek = [0, 0, 0, 0, 0, 0, 0];
      trips.list.forEach(trip => {
        const dayOfWeek = parseInt(moment(trip.date, 'YYYY-MM-DD').format('d'));
        daysOfWeek[dayOfWeek]++;
      });
      setDayOfWeekFrequencies(daysOfWeek.map((numTrips, index) => ({
        dayOfWeek: index + 1,
        numTrips
      })));

      // calculate top day of week
      const topDayOfWeekIndex = indexOfMax(daysOfWeek);
      setTopDayOfWeek({
        dayOfWeek: moment(`2020-01-01`, 'YYYY-M-DD').day(topDayOfWeekIndex).format('dddd'),
        numTrips: daysOfWeek[topDayOfWeekIndex]
      });
    }
  }, [trips]);

  return (
    <div className="Stats">
      <h6 className="Stats-header">
        Total Number of Trips: {trips.list.length}
      </h6>

      <h6 className="Stats-header">
        Stations Per Trip
      </h6>
      <p className="Stats-subheader">
        Most is {topStationsPerTrip} stations, average is {averageStationsPerTrip}
      </p>
      <StatsChart
        data={stationsPerTripFrequencies}
        x="stationsPerTrip"
        y="numTrips"
      />

      <h6 className="Stats-header">
        Top Stations
      </h6>
      <div className="Stats-topStations">
        {topStations.map(({ id, numVisits, photo, photos }) => {
          const stationPhoto = photos && photos.length > 0 ? photos[photos.length - 1].photo : photo;
          return (
            <Button
              className="Stats-topStation"
              key={id}
              onClick={() => onClickStation(id)}
              size="medium"
            >
              <span className="Stats-topStationPhoto" style={{ backgroundImage: `url(${stationPhoto})` }} />
              <span className="Stats-topStationDescription">
                <span className="Stats-topStationName">{stations.lookup[id].name}</span>
                <span className="Stats-topStationVisits">{`${numVisits} visits`}</span>
              </span>
            </Button>
          );
        })}
      </div>

      <h6 className="Stats-header">
        Trips by Month
      </h6>
      <p className="Stats-subheader">
        {topMonth.month} is most popular with {topMonth.numTrips} trips
      </p>
      <StatsChart
        data={monthFrequencies}
        tickCount={12}
        tickFormat={month => {
          return moment(`2020-${month}-01`, 'YYYY-M-DD').format('MMM');
        }}
        x="month"
        y="numTrips"
      />

      <h6 className="Stats-header">
        Trips by Day of Week
      </h6>
      <p className="Stats-subheader">
        {topDayOfWeek.dayOfWeek} is most popular with {topDayOfWeek.numTrips} trips
      </p>
      <StatsChart
        data={dayOfWeekFrequencies}
        tickCount={7}
        tickFormat={dayOfWeek => {
          return moment(`2020-01-01`, 'YYYY-M-DD').day(dayOfWeek - 1).format('ddd');
        }}
        x="dayOfWeek"
        y="numTrips"
      />

    </div>
  );
};

export default Stats;
