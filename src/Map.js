import React, { useEffect, useRef, useState } from 'react';
import './Map.css';

import IconButton from '@material-ui/core/IconButton';
import LocationDisabled from '@material-ui/icons/LocationDisabled';
import LocationSearching from '@material-ui/icons/LocationSearching';

import MAP_API_KEY from './map-api-key';
import MAP_STYLES from './map-styles';

const EXPANDED_MARKER_HEIGHT = 40;
const EXPANDED_MARKER_WIDTH = 30;
const MARKER_HEIGHT = 27;
const MARKER_WIDTH = 20;
const LOCATION_MARKER_HEIGHT = 10;
const LOCATION_MARKER_WIDTH = 10;

const MARKER_Z_INDEX = {
  INACTIVE: 1,
  VISITED: 2,
  UNVISITED: 3,
  ACTIVE: 4,
  LOCATION: 10
};

const MAP_OPTIONS = {
  center: { lat: 42.3615287, lng: -71.0677415 },
  zoom: 14,
  disableDefaultUI: false,
  fullscreenControl: false,
  mapTypeControl: false,
  streetViewControl: false,
  styles: MAP_STYLES
};

function MapComponent({
  onClearSelectedStation,
  onSelectStation,
  route,
  selectedStationId,
  stations,
  stationMap,
  updateStationDataWithMarkers,
  visitedStations
}) {
  const [activeMarkers, setActiveMarkers] = useState([]);
  const [activeRoute, setActiveRoute] = useState(null);
  const [isLocationError, setIsLocationError] = useState(false);
  const [locationMarker, setLocationMarker] = useState(null);
  const [map, setMap] = useState();
  const mapRef = useRef(null);

  useEffect(() => {
    loadMapScript();
  }, []);

  useEffect(() => {
    if (map) {
      initializeMap();
    }
  }, [map]);

  useEffect(() => {
    if (selectedStationId) {
      // reset all previous markers, if any
      activeMarkers.forEach(({ id, marker }) => {
        marker.setIcon({
          scaledSize: new window.google.maps.Size(MARKER_WIDTH, MARKER_HEIGHT),
          url: marker.icon.url
        });
        marker.setZIndex(determineMarkerZIndex(stationMap[id]));
      });

      // make the selected marker large and on top
      stationMap[selectedStationId].marker.setIcon({
        scaledSize: new window.google.maps.Size(EXPANDED_MARKER_WIDTH, EXPANDED_MARKER_HEIGHT),
        url: stationMap[selectedStationId].marker.icon.url
      });
      stationMap[selectedStationId].marker.setZIndex(MARKER_Z_INDEX.ACTIVE);

      // save this marker as the active marker
      setActiveMarkers([{
        id: selectedStationId,
        marker: stationMap[selectedStationId].marker
      }]);
    } else if (activeMarkers && activeMarkers.length > 0) {
      // reset all previous markers
      activeMarkers.forEach(({ id, marker }) => {
        marker.setIcon({
          scaledSize: new window.google.maps.Size(MARKER_WIDTH, MARKER_HEIGHT),
          url: marker.icon.url
        });
        marker.setZIndex(determineMarkerZIndex(stationMap[id]));
      });
      setActiveMarkers([]);
    }
  }, [selectedStationId, stationMap]);

  useEffect(() => {
    if (route && route.length > 0) {
      // remove the old route, if any
      if (activeRoute) {
        activeRoute.setMap(null);
      }

      // draw the new route
      setActiveRoute(drawRoute(route));
    } else if (activeRoute) {
      // remove the old route, if any
      activeRoute.setMap(null);
    }
  }, [route])

  const createMarker = ({ h, icon, lat, lng, w, ...rest }) => {
    return new window.google.maps.Marker({
      icon: {
        scaledSize: new window.google.maps.Size(w, h),
        url: icon
      },
      map,
      position: new window.google.maps.LatLng(lat, lng),
      ...rest
    });
  };

  const determineMarkerZIndex = station =>
    station.isInactive
      ? MARKER_Z_INDEX.INACTIVE
      : visitedStations[station.id]
        ? MARKER_Z_INDEX.VISITED
        : MARKER_Z_INDEX.UNVISITED;

  const drawRoute = stationIds => {
    const path = stationIds.map(stationId => ({
      lat: stationMap[stationId].lat,
      lng: stationMap[stationId].long
    }));

    var route = new window.google.maps.Polyline({
      path,
      geodesic: true,
      strokeColor: '#1967d2',
      strokeOpacity: 1.0,
      strokeWeight: 4
    });

    route.setMap(map);
    return route;
  };

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(handleLocationSuccess, handleLocationError);
    setIsLocationError(false);
  };

  const handleLocationError = e => {
    console.log('location request error', e);
    setIsLocationError(true);
  };

  const handleLocationSuccess = ({ coords }) => {
    const position = new window.google.maps.LatLng(coords.latitude, coords.longitude);

    if (locationMarker) {
      locationMarker.setMap(null);
    }

    const marker = createMarker({
      h: LOCATION_MARKER_HEIGHT,
      icon: 'img/blue-sphere.png',
      lat: coords.latitude,
      lng: coords.longitude,
      w: LOCATION_MARKER_WIDTH,
      zIndex: MARKER_Z_INDEX.LOCATION
    });
    setLocationMarker(marker);

    map.setCenter(position);
  };

  const initializeMap = () => {
    placeStationMarkers();
    getLocation();

    map.addListener('click', onClearSelectedStation);
  };

  const loadMapScript = () => {
    // create the script tag, set the appropriate attributes
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${MAP_API_KEY}&callback=initMap`;
    script.defer = true;
    script.async = true;

    // attach callback function to window for when JS API is loaded and available
    window.initMap = function () {
      setMap(new window.google.maps.Map(mapRef.current, MAP_OPTIONS));
    };

    // append the script element to head
    document.head.appendChild(script);
  };

  const placeStationMarkers = () => {
    const updatedStations = stations.map(station => {
      const iconStatus = station.isInactive ? 'inactive' : visitedStations[station.id] ? 'visited' : 'unvisited';

      let iconFillCount = '';
      if (!station.isInactive && !station.isLegacy) {
        const bikePercentage = Math.round((station.bikesAvailable / (station.bikesAvailable + station.docksAvailable)) * 100);
        const multiplier = (bikePercentage <= 50) ? Math.round(bikePercentage / 25) : Math.round(bikePercentage / 25);
        if (bikePercentage === 0) {
          iconFillCount = '-0';
        } else if (bikePercentage === 100) {
          iconFillCount = '-100';
        } else if (multiplier === 0 && bikePercentage !== 0) {
          iconFillCount = '-25';
        } else if (multiplier === 4 && bikePercentage !== 100) {
          iconFillCount = '-75';
        } else {
          iconFillCount = `-${multiplier * 25}`;
        }
      }

      const marker = createMarker({
        bikesAvailable: station.bikesAvailable,
        docksAvailable: station.docksAvailable,
        h: MARKER_HEIGHT,
        icon: `img/station-${iconStatus}${iconFillCount}.png`,
        id: station.id,
        isInactive: station.isInactive,
        isLegacy: station.isLegacy,
        lat: station.lat,
        lng: station.long,
        photo: station.photo,
        title: station.name,
        w: MARKER_WIDTH,
        zIndex: determineMarkerZIndex(station)
      });

      window.google.maps.event.addListener(marker, 'click', () => {
        onSelectStation(station.id);
      });

      return {
        ...station,
        marker
      };
    });

    // add marker references to the station list so the rest of the app can access the markers
    updateStationDataWithMarkers(updatedStations);
  };

  return (
    <>
      <div className="Map" ref={mapRef}></div>
      <div className="Map-location">
        <IconButton onClick={getLocation}>
          {isLocationError ? <LocationDisabled /> : <LocationSearching />}
        </IconButton>
      </div>
    </>
  )
};

export default MapComponent;
