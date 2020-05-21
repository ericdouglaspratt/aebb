import React, {useEffect, useState} from 'react';
import './HomePane.css';

import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

import TripList from './TripList';

const ProgressBar = withStyles({
  colorPrimary: {
    backgroundColor: '#cbddf3',
  },
  barColorPrimary: {
    backgroundColor: '#4db546',
  },
})(LinearProgress);

const HomePane = ({stations, stationMap, trips, visitedStations}) => {
  const [numVisited, setNumVisited] = useState(0);

  useEffect(() => {
    setNumVisited(Object.keys(visitedStations).length);
  }, [visitedStations]);

  const percentComplete = Math.round((numVisited / stations.length) * 100);

  return (
    <div className="HomePane">
      <div className="HomePane-progress">
        <p className="HomePane-progressStats" style={{width: `${percentComplete}%`}}>
          <span className="HomePane-progressPercent">{percentComplete}%</span>
          <span className="HomePane-progressAbsolute">{`${numVisited} of ${stations.length} stations`}</span>
        </p>
        <ProgressBar variant="determinate" value={percentComplete} />
      </div>
      <TripList
        stationMap={stationMap}
        trips={trips}
        visitedStations={visitedStations}
      />
    </div>
  );
};

export default HomePane;
