import React from 'react';
import './InfoPane.css';

import ArrowBack from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import HomePane from './HomePane';
import StationInfo from './StationInfo';

const useStyles = makeStyles((theme) => ({
  backButton: {
    color: '#ffffff'
  }
}));

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
  const classes = useStyles();
  const station = selectedStationId ? stations.lookup[selectedStationId] : null;

  return (
    <div className="InfoPane">
      <div className="InfoPane-header">
        {selectedStationId ? (
          <Button
            className={classes.backButton}
            onClick={onClearSelectedStation}
            startIcon={<ArrowBack />}
          >
            Back
          </Button>
        ) : isRouteMarkingActive ? (
          <Button
            className={classes.backButton}
            onClick={onRouteMarkingDeactivate}
          >
            Cancel
          </Button>
        ) : (
          <h1>
            Andy and Eric Bike Boston
          </h1>
        )}
      </div>
      <div className="InfoPane-content">
        {selectedStationId ? (
          <StationInfo station={station} />
        ) : (
          <HomePane
            diffLog={diffLog}
            onRouteMarkingActivate={onRouteMarkingActivate}
            stations={stations}
            trips={trips}
            visitedStations={visitedStations}
          />
        )}
      </div>
    </div>
  )
}

export default InfoPane;
