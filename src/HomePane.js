import React, {useEffect, useState} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import './HomePane.css';

import { BREAKPOINTS } from './constants';
import { useBreakpoint } from './helpers';

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
  isMenuOpen,
  onCloseMenu,
  onRouteMarkingActivate,
  stations,
  trips,
  visitedStations
}) => {
  const [numVisited, setNumVisited] = useState(0);
  const breakpoint = useBreakpoint();

  useEffect(() => {
    setNumVisited(Object.keys(visitedStations).length);
  }, [visitedStations]);

  const percentComplete = Math.round((numVisited / stations.list.length) * 100);

  return (
    <div className="HomePane">
      <div className="HomePane-progress">
        <p className="HomePane-progressPercent" style={{width: `${percentComplete}%`}}>
          {percentComplete}%
        </p>
        <ProgressBar variant="determinate" value={percentComplete} />
        <p className="HomePane-progressAbsolute" style={{width: `${percentComplete}%`}}>
          {`${numVisited} of ${stations.list.length} stations`}
        </p>
      </div>
      {breakpoint === BREAKPOINTS.MOBILE && (
        <Drawer anchor="bottom" open={isMenuOpen} onClose={onCloseMenu}>
          <MenuList>
            <MenuItem>View trips</MenuItem>
            {/*<MenuItem onClick={onRouteMarkingActivate}>Mark a route</MenuItem>*/}
          </MenuList>
        </Drawer>
      )}
      {breakpoint === BREAKPOINTS.DESKTOP && (
        <MenuList>
          <MenuItem>View trips</MenuItem>
          <MenuItem onClick={onRouteMarkingActivate}>Mark a route</MenuItem>
        </MenuList>
      )}
      {/*<HomeTabs
        diffLog={diffLog}
        onRouteMarkingActivate={onRouteMarkingActivate}
        stations={stations}
        trips={trips}
        visitedStations={visitedStations}
      />*/}
    </div>
  );
};

export default HomePane;
