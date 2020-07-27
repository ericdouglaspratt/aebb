import React from 'react';
import './TimeTravelPane.css';

import Progress from './Progress';

const TimeTravelPane = ({ activeTravelTimestamp, timeline }) => {
  const currentMonth = timeline && timeline.length ? timeline.find(month => month.timestamp === activeTravelTimestamp) : null;
  return (
    <div className="TimeTravelPane">
      {activeTravelTimestamp && currentMonth && (
        <Progress numStations={currentMonth.numStations} numVisited={currentMonth.numVisited} />
      )}
    </div>
  );
};

export default TimeTravelPane;
