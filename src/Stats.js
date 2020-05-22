import React, {useEffect, useState} from 'react';

const Stats = ({stationMap, trips}) => {
  const [averageStationsPerTrip, setAverageStationsPerTrip] = useState(0);
  const [maxStationsPerTrip, setMaxStationsPerTrip] = useState(0);
  const [minStationsPerTrip, setMinStationsPerTrip] = useState(0);
  const [topFiveVisitedStations, setTopFiveVisitedStations] = useState([]);

  useEffect(() => {
    if (trips && trips.length > 0) {
      const totalStationVisits = trips.reduce((result, trip) => result + trip.stations.length, 0);
      setAverageStationsPerTrip(Math.round(totalStationVisits / trips.length));

      setMaxStationsPerTrip(trips.reduce((result, trip) => Math.max(result, trip.stations.length), 0));
      setMinStationsPerTrip(trips.reduce((result, trip) => Math.min(result, trip.stations.length), 200));

      const stationVisitMap = trips.reduce((result, trip) => {
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
        id,
        numVisits: stationVisitMap[id]
      }));
      stationVisits.sort((a, b) => {
        return a.numVisits > b.numVisits ? -1 : a.numVisits < b.numVisits ? 1 : 0;
      });
      setTopFiveVisitedStations(stationVisits.slice(0, 5));
    }
  }, [trips])

  return (
    <div className="Stats">
      <p>
        Number of Trips: {trips.length}
      </p>
      <p>
        Stations Per Trip<br />
        Min: {minStationsPerTrip}, Average: {averageStationsPerTrip}, Max: {maxStationsPerTrip}
      </p>
      <p>
        Most Frequently Visited Stations<br />
      </p>
      <ol>
        {topFiveVisitedStations.map(({id, numVisits}) => (
          <li key={id}>{`${stationMap[id].name} (${numVisits})`}</li>
        ))}
      </ol>
    </div>
  );
};

export default Stats;
