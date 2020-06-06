import React, { useEffect, useRef, useState } from 'react';
import './Map.css';

import IconButton from '@material-ui/core/IconButton';
import LocationDisabled from '@material-ui/icons/LocationDisabled';
import LocationSearching from '@material-ui/icons/LocationSearching';

import MAP_API_KEY from './map-api-key';
import MAP_STYLES from './map-styles';

import { BREAKPOINTS } from './constants';
import { useBreakpoint } from './helpers';

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
  PHOTO: 4,
  ROUTE: 5,
  ACTIVE: 6,
  LOCATION: 10
};

const MAP_OPTIONS = {
  center: { lat: 42.3615287, lng: -71.0677415 },
  clickableIcons: false,
  zoom: 14,
  disableDefaultUI: false,
  fullscreenControl: false,
  mapTypeControl: false,
  streetViewControl: false,
  styles: MAP_STYLES
};

function MapComponent({
  activeTrip,
  ghostRoutes,
  onClearSelectedStation,
  onSelectPhoto,
  onSelectStation,
  route,
  selectedMarker,
  stations,
  updateStationDataWithMarkers,
  visitedStations
}) {
  const [activeMarker, setActiveMarker] = useState(null);
  const [activeRoute, setActiveRoute] = useState(null);
  const [highlightedMarkers, setHighlightedMarkers] = useState([]);
  const [isLocationError, setIsLocationError] = useState(false);
  const [locationMarker, setLocationMarker] = useState(null);
  const [map, setMap] = useState();
  const [tempMarkers, setTempMarkers] = useState([]);
  const mapRef = useRef(null);

  const breakpoint = useBreakpoint();

  useEffect(() => {
    loadMapScript();
  }, []);

  useEffect(() => {
    if (map) {
      initializeMap();
    }
  }, [map]);

  // handle active trip
  useEffect(() => {
    if (activeTrip && activeTrip.stations && activeTrip.stations.length > 0) {
      // remove the old route, if any
      if (activeRoute) {
        activeRoute.setMap(null);
      }

      // unhighlight all previous route markers, if any
      highlightedMarkers.forEach(({id, marker}) => {
        marker.setIcon({
          scaledSize: marker.icon.scaledSize,
          url: determineMarkerIcon({
            bikesAvailable: stations.lookup[id].bikesAvailable,
            docksAvailable: stations.lookup[id].docksAvailable,
            isInactive: stations.lookup[id].isInactive,
            isLegacy: stations.lookup[id].isLegacy,
            isVisited: !!visitedStations[id]
          })
        });
        marker.setZIndex(determineMarkerZIndex(stations.lookup[id]));
      });

      // remove any temp markers
      tempMarkers.forEach(marker => {
        marker.setMap(null);
      });

      // draw the new route
      setActiveRoute(drawRoute(activeTrip.stations));

      // highlight the route markers
      setHighlightedMarkers(activeTrip.stations.map(id => {
        const marker = stations.lookup[id].marker;
        marker.setIcon({
          scaledSize: marker.icon.scaledSize,
          url: determineMarkerIcon({
            bikesAvailable: stations.lookup[id].bikesAvailable,
            docksAvailable: stations.lookup[id].docksAvailable,
            isHighlighted: true,
            isInactive: stations.lookup[id].isInactive,
            isLegacy: stations.lookup[id].isLegacy,
            isVisited: !!visitedStations[id]
          })
        });
        marker.setZIndex(MARKER_Z_INDEX.ROUTE);
        return {
          id,
          marker
        };
      }));

      // create photo markers as necessary
      if (activeTrip.photos && activeTrip.photos.length > 0) {
        setTempMarkers(activeTrip.photos.map(photo => {
          const marker = createMarker({
            date: activeTrip.date,
            full: photo.full,
            h: MARKER_HEIGHT,
            icon: 'img/photo.png',
            lat: photo.lat,
            lng: photo.lng,
            thumb: photo.thumb,
            w: MARKER_WIDTH,
            zIndex: MARKER_Z_INDEX.PHOTO
          });
          window.google.maps.event.addListener(marker, 'click', () => {
            onSelectPhoto(activeTrip.id, photo.thumb, marker);
          });
          return marker;
        }));
      }

      // view the new route
      viewArea(activeTrip.stations);
    } else if (activeRoute) {
      // remove the old route, if any
      activeRoute.setMap(null);

      // unhighlight the route markers
      highlightedMarkers.forEach(({id, marker}) => {
        marker.setIcon({
          scaledSize: marker.icon.scaledSize,
          url: determineMarkerIcon({
            bikesAvailable: stations.lookup[id].bikesAvailable,
            docksAvailable: stations.lookup[id].docksAvailable,
            isInactive: stations.lookup[id].isInactive,
            isLegacy: stations.lookup[id].isLegacy,
            isVisited: !!visitedStations[id]
          })
        });
        marker.setZIndex(determineMarkerZIndex(stations.lookup[id]));
      });
      setHighlightedMarkers([]);

      // remove any temp markers
      tempMarkers.forEach(marker => {
        marker.setMap(null);
      });
    }
  }, [activeTrip]);

  // handle selected marker
  useEffect(() => {
    if (selectedMarker) {
      const oldZIndex = selectedMarker.marker.zIndex;

      // reset previous marker, if any
      if (activeMarker) {
        activeMarker.marker.setIcon({
          scaledSize: new window.google.maps.Size(MARKER_WIDTH, MARKER_HEIGHT),
          url: activeMarker.marker.icon.url
        });
        activeMarker.marker.setZIndex(activeMarker.oldZIndex);
      }

      // make the selected marker large and on top
      selectedMarker.marker.setIcon({
        scaledSize: new window.google.maps.Size(EXPANDED_MARKER_WIDTH, EXPANDED_MARKER_HEIGHT),
        url: selectedMarker.marker.icon.url
      });
      selectedMarker.marker.setZIndex(MARKER_Z_INDEX.ACTIVE);

      if (selectedMarker.moveCenter) {
        map.setCenter(selectedMarker.marker.position);
      }

      // save the active marker
      setActiveMarker({
        marker: selectedMarker.marker,
        oldZIndex
      });
    } else {
      // reset previous marker
      if (activeMarker) {
        activeMarker.marker.setIcon({
          scaledSize: new window.google.maps.Size(MARKER_WIDTH, MARKER_HEIGHT),
          url: activeMarker.marker.icon.url
        });
        activeMarker.marker.setZIndex(activeMarker.oldZIndex);
      }

      // clear active marker
      setActiveMarker(null);
    }
  }, [selectedMarker]);

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
  }, [route]);

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

  const determineMarkerIcon = ({
    bikesAvailable,
    docksAvailable,
    isHighlighted,
    isInactive,
    isLegacy,
    isVisited
  }) => {
    const iconStatus = isHighlighted ? 'highlighted' : isInactive ? 'inactive' : isVisited ? 'visited' : 'unvisited';

    let iconFillCount = '';
    if (!isInactive && !isLegacy) {
      const bikePercentage = Math.round((bikesAvailable / (bikesAvailable + docksAvailable)) * 100);
      const multiplier = (bikePercentage <= 50) ? Math.round(bikePercentage / 25) : Math.round(bikePercentage / 25);
      if (bikePercentage === 0) {
        iconFillCount = '-0';
      } else if (bikePercentage === 100) {
        iconFillCount = '-100';
      } else if (bikesAvailable === 1) {
        iconFillCount = '-1';
      } else if (docksAvailable === 1) {
        iconFillCount = '-99';
      } else if (multiplier === 0 && bikePercentage !== 0) {
        iconFillCount = '-25';
      } else if (multiplier === 4 && bikePercentage !== 100) {
        iconFillCount = '-75';
      } else {
        iconFillCount = `-${multiplier * 25}`;
      }
    }

    return `img/station-${iconStatus}${iconFillCount}.png`;
  };

  const determineMarkerZIndex = station =>
    station.isInactive
      ? MARKER_Z_INDEX.INACTIVE
      : visitedStations[station.id]
        ? MARKER_Z_INDEX.VISITED
        : MARKER_Z_INDEX.UNVISITED;

  const drawRoute = (stationIds, strokeColor = '#1967d2') => {
    const path = stationIds.map(stationId => ({
      lat: stations.lookup[stationId].lat,
      lng: stations.lookup[stationId].long
    }));

    var route = new window.google.maps.Polyline({
      path,
      geodesic: true,
      strokeColor,
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
    const updatedStations = stations.list.map(station => {
      const marker = createMarker({
        bikesAvailable: station.bikesAvailable,
        docksAvailable: station.docksAvailable,
        h: MARKER_HEIGHT,
        icon: determineMarkerIcon({
          bikesAvailable: station.bikesAvailable,
          docksAvailable: station.docksAvailable,
          isInactive: station.isInactive,
          isLegacy: station.isLegacy,
          isVisited: !!visitedStations[station.id]
        }),
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
        onSelectStation(station.id, marker);
      });

      return {
        ...station,
        marker
      };
    });

    // add marker references to the station list so the rest of the app can access the markers
    updateStationDataWithMarkers(updatedStations);
  };

  const viewArea = stationIds => {
    const lats = stationIds.map(stationId => stations.lookup[stationId].lat);
    const lngs = stationIds.map(stationId => stations.lookup[stationId].long);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);

    const bounds = new window.google.maps.LatLngBounds();
    bounds.extend(new window.google.maps.LatLng(minLat, minLng));
    bounds.extend(new window.google.maps.LatLng(maxLat, maxLng));
    map.fitBounds(
      bounds,
      breakpoint === BREAKPOINTS.MOBILE
        ? {bottom: 200, left: 20, right: 20, top: 20}
        : {bottom: 40, left: 360, right: 40, top: 40}
    );
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
