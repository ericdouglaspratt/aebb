import React from 'react';
import './StationInfo.css';

const StationInfo = ({station}) => {
  const showBikeDockInfo = !station.isInactive && (typeof station.bikesAvailable != 'undefined' || typeof station.docksAvailable != 'undefined');

  return (
    <div className="StationInfo">
      {station.photo && (
        <div className="StationInfo-photo" style={{backgroundImage: `url(${station.photo})`}} />
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
              <span className="StationInfo-statusNumber">{station.bikesAvailable}</span> Bikes
            </p>
            <p className="StationInfo-statusItem">
              <span className="StationInfo-statusNumber">{station.docksAvailable}</span> Docks
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StationInfo;
