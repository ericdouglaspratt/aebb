import React, { useEffect, useRef, useState } from 'react';
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

const FRAME_DELAY = 10;

const Progress = ({numStations, numVisited, shouldAnimate}) => {
  const [showFireworks, setShowFireworks] = useState(false);
  const percentRef = useRef(null);
  const progressRef = useRef(null);
  const absoluteRef = useRef(null);

  const percentComplete = Math.floor((numVisited / numStations) * 100);
  let displayPercent = 0;

  useEffect(() => {
    if (shouldAnimate) {
      setTimeout(updatePercent, FRAME_DELAY);
    }
  }, []);

  const updatePercent = () => {
    if (absoluteRef.current && percentRef.current && progressRef.current) {
      displayPercent = Math.min(displayPercent + 1, percentComplete);
      const displayNumVisited = Math.round((displayPercent / 100) * numStations);
      const barRef = progressRef.current.getElementsByClassName('MuiLinearProgress-bar')[0];

      requestAnimationFrame(() => {
        if (percentRef && percentRef.current) {
          percentRef.current.innerHTML = `${displayPercent}%`;
          percentRef.current.style.width = `${displayPercent}%`;
        }

        if (progressRef && progressRef.current && barRef) {
          progressRef.current.setAttribute('aria-valueNow', displayPercent);
          barRef.style.transition = 'none';
          barRef.style.transform = `translateX(${-100 + displayPercent}%)`;
        }

        if (absoluteRef && absoluteRef.current) {
          absoluteRef.current.innerHTML = `${displayNumVisited} of ${numStations} stations`;
          absoluteRef.current.style.width = `${displayPercent}%`;
        }
      });
      if (displayPercent !== percentComplete) {
        setTimeout(updatePercent, FRAME_DELAY);
      } else if (percentComplete === 100) {
        setShowFireworks(true);
      } else if (absoluteRef && absoluteRef.current) {
        setTimeout(() => {
          requestAnimationFrame(() => {
            absoluteRef.current.innerHTML = `${numVisited} of ${numStations} stations`;
          });
        }, FRAME_DELAY);
      }
    }
  };
  
  return (
    <>
      <div className="Progress">
        {shouldAnimate ? (
          <>
            <p
              className="Progress-percent"
              ref={percentRef}
              style={{transition: 'none', width: '0%'}}
            >
              0%
            </p>
            <ProgressBar
              ref={progressRef}
              variant="determinate"
              value={displayPercent}
            />
            <p
              className="Progress-absolute"
              ref={absoluteRef}
              style={{transition: 'none', width: '0%'}}
            >
              {`0 of ${numStations} stations`}
            </p>
          </>
        ) : (
          <>
            <p className="Progress-percent" style={{width: `${percentComplete}%`}}>
              {percentComplete}%
            </p>
            <ProgressBar variant="determinate" value={percentComplete} />
            <p className="Progress-absolute" style={{width: `${percentComplete}%`}}>
              {`${numVisited} of ${numStations} stations`}
            </p>
          </>
        )}
      </div>
      {showFireworks && (
        <div className="pyro">
          <div className="before"></div>
          <div className="after"></div>
        </div>
      )}
    </>
  );
};

export default Progress;
