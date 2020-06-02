import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';
import './Progress.css';

const ProgressBar = withStyles({
  colorPrimary: {
    backgroundColor: '#cbddf3',
  },
  barColorPrimary: {
    backgroundColor: '#4db546',
  },
})(LinearProgress);

const Progress = ({stations, visitedStations}) => {
  const numVisited = Object.keys(visitedStations).length;
  const percentComplete = Math.round((numVisited / stations.list.length) * 100);
  return (
    <div className="Progress">
      <p className="Progress-percent" style={{width: `${percentComplete}%`}}>
        {percentComplete}%
      </p>
      <ProgressBar variant="determinate" value={percentComplete} />
      <p className="Progress-absolute" style={{width: `${percentComplete}%`}}>
        {`${numVisited} of ${stations.list.length} stations`}
      </p>
    </div>
  );
};

export default Progress;
