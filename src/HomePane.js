import React, {useEffect, useState} from 'react';
import './HomePane.css';

import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

import HomeTabs from './HomeTabs';

const ProgressBar = withStyles({
  colorPrimary: {
    backgroundColor: '#cbddf3',
  },
  barColorPrimary: {
    backgroundColor: '#4db546',
  },
})(LinearProgress);

const HomePane = ({
  diffLog,
  onRouteMarkingActivate,
  stations,
  stationMap,
  trips,
  visitedStations
}) => {
  const [numVisited, setNumVisited] = useState(0);

  useEffect(() => {
    setNumVisited(Object.keys(visitedStations).length);
  }, [visitedStations]);

  const percentComplete = Math.round((numVisited / stations.length) * 100);

  return (
    <div className="HomePane">
      <div className="HomePane-progress">
        <p className="HomePane-progressPercent" style={{width: `${percentComplete}%`}}>
          {percentComplete}%
        </p>
        <ProgressBar variant="determinate" value={percentComplete} />
        <p className="HomePane-progressAbsolute" style={{width: `${percentComplete}%`}}>
          {`${numVisited} of ${stations.length} stations`}
        </p>
      </div>
      <HomeTabs
        diffLog={diffLog}
        onRouteMarkingActivate={onRouteMarkingActivate}
        stationMap={stationMap}
        trips={trips}
        visitedStations={visitedStations}
      />
    </div>
  );
};

export default HomePane;
