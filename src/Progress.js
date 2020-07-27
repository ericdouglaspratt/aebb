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

const Progress = ({numStations, numVisited}) => {
  const percentComplete = Math.round((numVisited / numStations) * 100);
  return (
    <div className="Progress">
      <p className="Progress-percent" style={{width: `${percentComplete}%`}}>
        {percentComplete}%
      </p>
      <ProgressBar variant="determinate" value={percentComplete} />
      <p className="Progress-absolute" style={{width: `${percentComplete}%`}}>
        {`${numVisited} of ${numStations} stations`}
      </p>
    </div>
  );
};

export default Progress;
