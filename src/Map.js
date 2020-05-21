import React, { useEffect, useRef, useState } from 'react';
import './Map.css';

import MAP_API_KEY from './map-api-key';
import mapStyles from './map-styles';

const mapOptions = {
  center: { lat: 42.3615287, lng: -71.0677415 },
  zoom: 14,
  disableDefaultUI: false,
  fullscreenControl: false,
  mapTypeControl: false,
  streetViewControl: false,
  styles: mapStyles
};

function MapComponent({ stations, trips, visitedStations }) {
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

  const createInfoWindow = marker => {
    var infoWindow = new window.google.maps.InfoWindow();
    window.google.maps.event.addListener(marker, 'click', function() {
      var content = '<h4 style="margin: 0; width: 200px;">' + this.title + (this.isLegacy ? ' (Legacy)' : '') + '</h4>';
      if (this.photo) {
        content += '<img src="' + this.photo + '" style="margin-top: 10px; height: 200px; width: 200px;" />';
      }
      infoWindow.setContent(content);
      infoWindow.open(map, this);
    });
  };

  const createMarker = ({ icon, lat, lng, size, ...rest }) => {
    return new window.google.maps.Marker({
      icon: {
        scaledSize: new window.google.maps.Size(size, size),
        url: icon
      },
      map,
      position: new window.google.maps.LatLng(lat, lng),
      ...rest
    });
  };

  const initializeMap = () => {
    placeStationMarkers();
  };

  const loadMapScript = () => {
    // create the script tag, set the appropriate attributes
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${MAP_API_KEY}&callback=initMap`;
    script.defer = true;
    script.async = true;

    // attach callback function to window for when JS API is loaded and available
    window.initMap = function () {
      setMap(new window.google.maps.Map(mapRef.current, mapOptions));
    };

    // append the script element to head
    document.head.appendChild(script);
  };

  const placeStationMarkers = () => {
    stations.forEach(station => {
      const marker = createMarker({
        icon: visitedStations[station.id] ? 'img/marker-filled.png' : 'img/marker-outline.png',
        isLegacy: station.isLegacy,
        lat: station.lat,
        lng: station.long,
        photo: station.photo,
        size: visitedStations[station.id] ? 8 : 20,
        title: station.name
      });

      createInfoWindow(marker);
    });
  };

  return (
    <div className="Map" ref={mapRef}></div>
  )
};

export default MapComponent;
