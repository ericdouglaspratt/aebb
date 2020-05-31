import React, { useState } from 'react';
import './InfoPane.css';

import { BREAKPOINTS } from './constants';
import { useBreakpoint } from './helpers';

import BackButton from './BackButton';
import CancelButton from './CancelButton';
import HomePane from './HomePane';
import MenuButton from './MenuButton';
import StationInfo from './StationInfo';

function InfoPane({
  diffLog,
  isRouteMarkingActive,
  onClearSelectedStation,
  onRouteMarkingActivate,
  onRouteMarkingDeactivate,
  selectedStationId,
  stations,
  trips,
  visitedStations
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const breakpoint = useBreakpoint();
  const station = selectedStationId ? stations.lookup[selectedStationId] : null;

  const handleClickMenuButton = () => {
    setIsMenuOpen(true);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="InfoPane">
      {selectedStationId ? (
        <>
          <div className="InfoPane-header">
            <BackButton onClick={onClearSelectedStation} />
          </div>
          <div className="InfoPane-content">
            <StationInfo station={station} />
          </div>
        </>
      ) : isRouteMarkingActive ? (
        <div className="InfoPane-header">
          <CancelButton onClick={onRouteMarkingDeactivate} />
        </div>
      ) : (
        <>
          <div className="InfoPane-header">
            <h1>
              Andy and Eric Bike Boston
            </h1>
            {breakpoint === BREAKPOINTS.MOBILE && (
              <MenuButton onClick={handleClickMenuButton} />
            )}
          </div>
          <div className="InfoPane-content">
            <HomePane
              diffLog={diffLog}
              isMenuOpen={isMenuOpen}
              onCloseMenu={handleCloseMenu}
              onRouteMarkingActivate={onRouteMarkingActivate}
              stations={stations}
              trips={trips}
              visitedStations={visitedStations}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default InfoPane;
