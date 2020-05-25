import React, { useState } from 'react';
import './HomeTabs.css';

import { withStyles } from '@material-ui/core/styles';
import BarChart from '@material-ui/icons/BarChart';
import Code from '@material-ui/icons/Code';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import History from '@material-ui/icons/History';
import PhotoLibrary from '@material-ui/icons/PhotoLibrary';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import Console from './Console';
import Stats from './Stats';
import TripList from './TripList';

const SmallTab = withStyles({
  root: {
    flexGrow: 1,
    minWidth: 48
  }
})(Tab);

const ACTIVE_VIEWS = {
  STATS: 0,
  TRIPS: 1,
  PHOTOS: 2,
  CONSOLE: 3
};

const HomeTabs = ({
  diffLog,
  onRouteMarkingActivate,
  stations,
  trips,
  visitedStations
}) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (e, value) => {
    setActiveTab(value);
  };

  return (
    <div className="HomeTabs"></div>
  );

  /*return (
    <div className="HomeTabs">
      <MenuList>
        <MenuItem onClick={onRouteMarkingActivate}>Mark a route</MenuItem>
        <MenuItem>View stats</MenuItem>
        <MenuItem>Logout</MenuItem>
      </MenuList>
      <Tabs
        value={activeTab}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <SmallTab icon={<BarChart />} aria-label="Stats" />
        <SmallTab icon={<History />} aria-label="Trips" />
        <SmallTab icon={<PhotoLibrary />} aria-label="Photos" />
        <SmallTab icon={<Code />} aria-label="Console" />
      </Tabs>
      {activeTab === ACTIVE_VIEWS.STATS && (
        <Stats
          stations={stations}
          trips={trips}
          visitedStations={visitedStations}
        />
      )}
      {activeTab === ACTIVE_VIEWS.TRIPS && (
        <TripList
          trips={trips}
          visitedStations={visitedStations}
        />
      )}
      {activeTab === ACTIVE_VIEWS.CONSOLE && (
        <Console diffLog={diffLog} />
      )}
    </div>
  );*/
};

export default HomeTabs;
