import React from 'react';
import './StationInfo.css';

const StationInfo = ({ station, trips }) => {
  const showBikeDockInfo = !station.isInactive && (typeof station.bikesAvailable != 'undefined' || typeof station.docksAvailable != 'undefined');
  // const stationTrips = trips.list.filter(trip => trip.stations.indexOf(station.id) > -1);
  const photo = station.photos && station.photos.length > 0 ? station.photos[station.photos.length - 1].photo : station.photo;

  return (
    <div className="StationInfo">
      {photo && (
        <div className="StationInfo-photo" style={{ backgroundImage: `url(${photo})` }} />
      )}
      <div className="StationInfo-content">
        <h2 className="StationInfo-header">
          {station.name}
        </h2>
        {station.isLegacy && (
          <p className="StationInfo-subheader">
            permanently removed
          </p>
        )}
        {station.isInactive && !station.isLegacy && (
          <p className="StationInfo-subheader">
            inactive
          </p>
        )}
        {showBikeDockInfo && (
          <div className="StationInfo-status">
            <p className="StationInfo-statusItem">
              <span className="StationInfo-statusNumber">{station.bikesAvailable}</span> {station.bikesAvailable === 1 ? 'Bike' : 'Bikes'}
            </p>
            <p className="StationInfo-statusItem">
              <span className="StationInfo-statusNumber">{station.docksAvailable}</span> {station.docksAvailable === 1 ? 'Dock' : 'Docks'}
            </p>
          </div>
        )}
        {/*<div>
          Trips: 
          {stationTrips.map(trip => <span key={trip.date}>{trip.date} </span>)}
        </div>*/}
      </div>
    </div>
  );
};

export default StationInfo;
