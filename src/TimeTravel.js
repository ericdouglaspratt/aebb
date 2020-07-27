import React, { useEffect, useState } from 'react';
import Slider from '@material-ui/core/Slider';
import moment from 'moment';
import './TimeTravel.css';

const TimeTravel = ({
  activeTravelTimestamp,
  setActiveTravelTimestamp,
  timeline
}) => {
  const currentMonth = timeline && timeline.length ? timeline.find(month => month.timestamp === activeTravelTimestamp) : null;
  const min = timeline && timeline.length ? timeline[0].timestamp : null;
  const max = timeline && timeline.length ? timeline[timeline.length - 1].timestamp : null;

  const [defaultTimestamp] = useState(activeTravelTimestamp || min);

  useEffect(() => {
    if (timeline && timeline.length > 0 && !activeTravelTimestamp) {
      setActiveTravelTimestamp(timeline[0].timestamp);
    }
  }, [timeline]);

  const marks = timeline.map(month => {
    const timestamp = moment(month.timestamp * 1000);
    return {
      value: month.timestamp,
      label: timestamp.month() === 0 ? timestamp.format('YYYY') : ''
    };
  });

  const formatSliderLabel = val => {
    return moment(val * 1000).format('MMM YY');
  };

  const getValueText = val => {
    return val;
  };

  const handleSliderChange = (e, val) => {
    setActiveTravelTimestamp(val);
  };

  return (
    <div className="TimeTravel">
      {activeTravelTimestamp && currentMonth && (
        <div className="TimeTravel-pane">
          <div className="TimeTravel-currentMonth">
            {currentMonth.description}
          </div>
          <Slider
            aria-labelledby="discrete-slider"
            defaultValue={defaultTimestamp}
            getAriaValueText={getValueText}
            marks={marks}
            max={max}
            min={min}
            onChange={handleSliderChange}
            step={null}
          />
        </div>
      )}
    </div>
  );
};

export default TimeTravel;
