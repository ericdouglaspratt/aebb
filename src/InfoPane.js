import React, { useState } from 'react';
import DirectionsBike from '@material-ui/icons/DirectionsBike';
import Drawer from '@material-ui/core/Drawer';
import Equalizer from '@material-ui/icons/Equalizer';
import History from '@material-ui/icons/History';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import './InfoPane.css';

import { BREAKPOINTS, VIEWS } from './constants';
import { useBreakpoint } from './helpers';

import BackButton from './BackButton';
import CancelButton from './CancelButton';
import MenuButton from './MenuButton';
import Photo from './Photo';
import Photos from './Photos';
import Progress from './Progress';
import RouteMarking from './RouteMarking';
import StationInfo from './StationInfo';
import Stats from './Stats';
import TimeTravel from './TimeTravel';
import TimeTravelPane from './TimeTravelPane';
import Trip from './Trip';
import TripList from './TripList';

function InfoPane({
  activeTravelTimestamp,
  onClearSelectedStation,
  onViewActivate,
  onViewDeactivate,
  onViewReplace,
  setActiveTravelTimestamp,
  stations,
  timeline,
  trips,
  viewStack,
  visitedStations
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const activeView = viewStack.length > 0 ? viewStack[viewStack.length - 1] : null;
  const breakpoint = useBreakpoint();

  const handleClickMenuButton = () => {
    setIsMenuOpen(true);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  const handleClickMenuItem = view => {
    handleCloseMenu();
    setTimeout(() => {
      onViewActivate(view);
    }, 225);
  };

  const handleClickPhoto = (photo, trip) => {
    onViewActivate(VIEWS.PHOTO, {
      photo,
      trip
    });
  };

  const handleClickStation = stationId => {
    onViewActivate(VIEWS.STATION, {
      id: stationId,
      marker: stations.lookup[stationId].marker,
      moveCenter: true
    });
  };

  const handleClickTrip = trip => {
    onViewReplace(VIEWS.TRIP_LIST, trip);
    setTimeout(() => {
      onViewActivate(VIEWS.TRIP, trip);
    }, 225);
  };

  return (
    <>
      {!!activeView && activeView.view === VIEWS.PHOTO ? (
        <div className="InfoPane">
          <div className="InfoPane-header">
            <BackButton onClick={() => onViewDeactivate(VIEWS.PHOTO)} />
          </div>
          <div className="InfoPane-content">
            <Photo
              photo={activeView.payload.photo}
              trip={activeView.payload.trip}
            />
          </div>
        </div>
      ) : !!activeView && activeView.view === VIEWS.ROUTE_MARKING ? (
        <>
          <div className="InfoPane">
            <div className="InfoPane-header">
              <CancelButton onClick={() => onViewDeactivate(VIEWS.ROUTE_MARKING)} />
            </div>
          </div>
          <RouteMarking />
        </>
      ) : !!activeView && activeView.view === VIEWS.STATION ? (
        <div className="InfoPane">
          <div className="InfoPane-header">
            <BackButton onClick={onClearSelectedStation} />
          </div>
          <div className="InfoPane-content">
            <StationInfo
              station={stations.lookup[activeView.payload.id]}
              trips={trips}
            />
          </div>
        </div>
      ) : !!activeView && activeView.view === VIEWS.TRIP ? (
        <div className="InfoPane">
          <div className="InfoPane-header">
            <BackButton onClick={() => onViewDeactivate(VIEWS.TRIP_LIST)} />
          </div>
          <div className="InfoPane-content">
            <Trip
              onClickPhoto={handleClickPhoto}
              trip={activeView.payload}
              trips={trips}
            />
          </div>
        </div>
      ) : breakpoint === BREAKPOINTS.DESKTOP && !!activeView && activeView.view === VIEWS.PHOTOS ? (
        <div className="InfoPane InfoPane--scrollable">
          <div className="InfoPane-header">
            <BackButton onClick={() => onViewDeactivate(VIEWS.PHOTOS)} />
          </div>
          <div className="InfoPane-content">
            <Photos
              onClickStation={handleClickStation}
              onClickTrip={handleClickTrip}
              stations={stations}
              trips={trips}
            />
          </div>
        </div>
      ) : breakpoint === BREAKPOINTS.DESKTOP && !!activeView && activeView.view === VIEWS.STATS ? (
        <div className="InfoPane InfoPane--scrollable">
          <div className="InfoPane-header">
            <BackButton onClick={() => onViewDeactivate(VIEWS.STATS)} />
          </div>
          <div className="InfoPane-content">
            <Stats
              onClickStation={handleClickStation}
              onClickTrip={handleClickTrip}
              stations={stations}
              trips={trips}
            />
          </div>
        </div>
      ) : breakpoint === BREAKPOINTS.DESKTOP && !!activeView && activeView.view === VIEWS.TIME_TRAVEL ? (
        <>
          <div className="InfoPane">
            <div className="InfoPane-header">
              <BackButton onClick={() => onViewDeactivate(VIEWS.TIME_TRAVEL)} />
            </div>
            <div className="InfoPane-content">
              <TimeTravelPane
                activeTravelTimestamp={activeTravelTimestamp}
                timeline={timeline}
              />
            </div>
          </div>
          <TimeTravel
            activeTravelTimestamp={activeTravelTimestamp}
            setActiveTravelTimestamp={setActiveTravelTimestamp}
            stations={stations}
            timeline={timeline}
            trips={trips}
          />
        </>
      ) : breakpoint === BREAKPOINTS.DESKTOP && !!activeView && activeView.view === VIEWS.TRIP_LIST ? (
        <div className="InfoPane InfoPane--scrollable">
          <div className="InfoPane-header">
            <BackButton onClick={() => onViewDeactivate(VIEWS.TRIP_LIST)} />
          </div>
          <div className="InfoPane-content">
            <TripList
              activeTrip={activeView.payload}
              onClickTrip={handleClickTrip}
              stations={stations}
              trips={trips}
            />
          </div>
        </div>
      ) : (
        <div className="InfoPane">
          <div className="InfoPane-header">
            <h1>
              Andy and Eric Bike Boston
            </h1>
            {breakpoint === BREAKPOINTS.MOBILE && (
              <MenuButton onClick={handleClickMenuButton} />
            )}
          </div>
          <div className="InfoPane-content">
            <div className="InfoPane-contentMain">
              <Progress numStations={stations.list.length} numVisited={Object.keys(visitedStations).length} />
              {breakpoint === BREAKPOINTS.MOBILE && (
                <Drawer anchor="bottom" open={isMenuOpen} onClose={handleCloseMenu}>
                  <MenuList>
                    <MenuItem onClick={() => handleClickMenuItem(VIEWS.TRIP_LIST)}>
                      <ListItemIcon><DirectionsBike /></ListItemIcon>
                      Trips
                    </MenuItem>
                    <MenuItem onClick={() => handleClickMenuItem(VIEWS.STATS)}>
                      <ListItemIcon><Equalizer /></ListItemIcon>
                      Stats
                    </MenuItem>
                    <MenuItem onClick={() => handleClickMenuItem(VIEWS.PHOTOS)}>
                      <ListItemIcon><PhotoCamera /></ListItemIcon>
                      Photos
                    </MenuItem>
                    {/*<MenuItem onClick={() => handleClickMenuItem(VIEWS.ROUTE_MARKING)}>Mark a route</MenuItem>*/}
                  </MenuList>
                </Drawer>
              )}
              {breakpoint === BREAKPOINTS.DESKTOP && (
                <MenuList className="InfoPane-menu">
                  <MenuItem onClick={() => handleClickMenuItem(VIEWS.TRIP_LIST)}>
                    <ListItemIcon><DirectionsBike /></ListItemIcon>
                    Trips
                  </MenuItem>
                  <MenuItem onClick={() => handleClickMenuItem(VIEWS.STATS)}>
                    <ListItemIcon><Equalizer /></ListItemIcon>
                    Stats
                  </MenuItem>
                  <MenuItem onClick={() => handleClickMenuItem(VIEWS.PHOTOS)}>
                    <ListItemIcon><PhotoCamera /></ListItemIcon>
                    Photos
                  </MenuItem>
                  <MenuItem onClick={() => handleClickMenuItem(VIEWS.TIME_TRAVEL)}>
                    <ListItemIcon><History /></ListItemIcon>
                    Time Travel (beta)
                  </MenuItem>
                  {/*<MenuItem onClick={() => handleClickMenuItem(VIEWS.ROUTE_MARKING)}>Mark a route</MenuItem>*/}
                </MenuList>
              )}
            </div>
          </div>
        </div>
      )}
      {breakpoint === BREAKPOINTS.MOBILE && (
        <Drawer
          anchor="bottom"
          open={!!activeView && activeView.view === VIEWS.PHOTOS}
          onClose={() => onViewDeactivate(VIEWS.PHOTOS)}
        >
          <div className="InfoPane-header InfoPane-header--inDrawer">
            <CancelButton label="Close" onClick={() => onViewDeactivate(VIEWS.PHOTOS)} />
          </div>
          <Photos
            onClickStation={handleClickStation}
            onClickTrip={handleClickTrip}
            stations={stations}
            trips={trips}
          />
        </Drawer>
      )}
      {breakpoint === BREAKPOINTS.MOBILE && (
        <Drawer
          anchor="bottom"
          open={!!activeView && activeView.view === VIEWS.STATS}
          onClose={() => onViewDeactivate(VIEWS.STATS)}
        >
          <div className="InfoPane-header InfoPane-header--inDrawer">
            <CancelButton label="Close" onClick={() => onViewDeactivate(VIEWS.STATS)} />
          </div>
          <Stats
            onClickStation={handleClickStation}
            onClickTrip={handleClickTrip}
            stations={stations}
            trips={trips}
          />
        </Drawer>
      )}
      {breakpoint === BREAKPOINTS.MOBILE && (
        <Drawer
          anchor="bottom"
          open={!!activeView && activeView.view === VIEWS.TRIP_LIST}
          onClose={() => onViewDeactivate(VIEWS.TRIP_LIST)}
        >
          <div className="InfoPane-header InfoPane-header--inDrawer">
            <CancelButton label="Close" onClick={() => onViewDeactivate(VIEWS.TRIP_LIST)} />
          </div>
          <TripList
            activeTrip={activeView && activeView.payload}
            onClickTrip={handleClickTrip}
            stations={stations}
            trips={trips}
          />
        </Drawer>
      )}
    </>
  );
}

export default InfoPane;
