import React, {useState} from 'react';
import moment from 'moment';
import './Photos.css';

import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import { VIEWS } from './constants';

import TabPanel from './TabPanel';
import TripButton from './TripButton';

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

const Photos = ({
  activeTabIndex = 0,
  onClickStation,
  onClickTrip,
  onViewActivate,
  stations,
  trips
}) => {
  const reversedTrips = trips.list.slice().reverse();

  // store the new active tab index in the view payload
  const handleChange = (e, index) => {
    onViewActivate(VIEWS.PHOTOS, { activeTabIndex : index });
  };

  return (
    <div className="Photos">
      {/*<Tabs
        aria-label="tabs"
        onChange={handleChange}
        value={activeTabIndex}
        variant="fullWidth"
      >
        <Tab label="Trips" {...a11yProps(0)} />
        <Tab label="Stations" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={activeTabIndex} index={0}>
        Trips
      </TabPanel>
      <TabPanel value={activeTabIndex} index={1}>*/}
        {reversedTrips.map(trip => {
          return (
            <div className="Photos-day" key={trip.id}>
              <TripButton
                {...trip}
                hideDistance
                hidePhotos
                hideStations
                onClick={() => onClickTrip(trip)}
              />
              <div className="Photos-dayImages">
                {trip.stations.map((stationId, index) => {
                  const station = stations.lookup[stationId];
                  let photo = station.photo;
                  if (station.photos && station.photos.length > 0) {
                    const match = station.photos.find(photo => photo.date === trip.date);
                    if (match) {
                      photo = match.photo;
                    }
                  }

                  if (photo) {
                    const className = photo === station.photo ? "Photos-image Photos-image--old" : "Photos-image";
                    return (
                      <button
                        className={className} key={`${trip.date}${photo}${index}`}
                        onClick={() => onClickStation(stationId)}
                        style={{ backgroundImage: `url(${photo})` }}
                      />
                    );
                  } else {
                    return (
                      <button
                        className="Photos-noImage"
                        key={`${stationId}${trip.date}${index}`}
                        onClick={() => onClickStation(stationId)}
                      />
                    );
                  }
                })}
              </div>
            </div>
          );
        })}
      {/*</TabPanel>*/}
    </div>
  );
}

export default Photos;
