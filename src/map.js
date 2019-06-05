import React from 'react';
import {union} from 'lodash';

import mapStyles from 'map-styles';
import stations from 'data-stations';
import trips from 'data-trips';

const mapOptions = {
  center: { lat: 42.3615287, lng: -71.0677415 },
  zoom: 14,
  disableDefaultUI: false,
  fullscreenControl: false,
  mapTypeControl: false,
  streetViewControl: false,
  styles: {
    ...mapStyles
  }
};

class Map extends Component {
  componentDidMount() {
    this.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    this.stationLookup = stations.reduce((lookup, station) => {
      lookup[station.id] = station;
    }, {});
  }

  drawDayRoute(visited, color) {
    var numVisited = visited.length;
    var dayCoords = [];
  
    for (var i = 0; i < numVisited; i++) {
      dayCoords.push({
        lat: this.stationLookup[visited[i]].lat,
        lng: this.stationLookup[visited[i]].long
      });
    }
  
    var dayLine = new google.maps.Polyline({
      path: dayCoords,
      geodesic: true,
      strokeColor: color,
      strokeOpacity: 1.0,
      strokeWeight: 2
    });
  
    dayLine.setMap(map);
  }

  initialize() {
    const visited = trips.reduce((result, trip) => {
      result = union(result, trip.stations);
    }, []);
  
    /*var numStations = stations.length;
    var numVisited = visited.length;
  
    var percentComplete = Math.round((numVisited / numStations) * 100);
    console.log(numVisited + ' stations visited, ' + (numStations - numVisited) + ' stations remaining, ' + numStations + ' stations total, ' + percentComplete + '% complete');
  
    var completedBar = document.getElementsByClassName('ProgressBar-completed')[0];
    completedBar.style.width = `${percentComplete}%`;
  
    var percentageEl = document.getElementsByClassName('ProgressBar-percentage')[0];
    percentageEl.innerHTML = `${percentComplete}%`;
  
    var stationsVisitedEl = document.getElementsByClassName('ProgressBar-stationsComplete')[0];
    stationsVisitedEl.innerHTML = `${numVisited} stations visited`;
  
    var numStationsEl = document.getElementsByClassName('ProgressBar-max')[0];
    numStationsEl.innerHTML = numStations;
  
    var reversedTrips = trips.slice().reverse();
    var tripHtml = [
      '<ul>',
      ...reversedTrips.map(trip => {
        const dateObj = moment(trip.date, 'YYYY-MM-DD');
        return `<li>${dateObj.format('MMM D, YYYY')} - ${trip.stations.length} stations</li>`;
      }),
      '</ul>'
    ].join('');
    var tripHistoryEl = document.getElementsByClassName('TripHistory')[0];
    tripHistoryEl.innerHTML = tripHtml;*/
  
    stations.forEach(station => {

    });

    for (var i = 0; i < numStations; i++) {
      let isVisited = false;
      for (var j = 0; j < numVisited; j++) {
        if (stations[i].id === visited[j]) {
          isVisited = true;
          var marker = new google.maps.Marker({
            icon: {
              scaledSize: new google.maps.Size(20, 20),
              url: stations[i].photo || 'img/marker-filled.png',
              strokeColor: '#000000'
            },
            map: map,
            position: new google.maps.LatLng(stations[i].lat, stations[i].long),
            title: stations[i].name,
            photo: stations[i].photo,
            isLegacy: stations[i].isLegacy
          });
          break;
        }
      }
      if (!isVisited) {
        var marker = new google.maps.Marker({
          icon: {
            scaledSize: new google.maps.Size(20, 20),
            url: 'img/marker-outline.png'
          },
          map: map,
          position: new google.maps.LatLng(stations[i].lat, stations[i].long),
          title: stations[i].name,
          photo: stations[i].photo
        });
      }
  
      var infoWindow = new google.maps.InfoWindow();
      google.maps.event.addListener(marker, 'click', function () {
        var content = '<h4 style="margin: 0; width: 200px;">' + this.title + (this.isLegacy ? ' (Legacy)' : '') + '</h4>';
        if (this.photo) {
          content += '<img src="' + this.photo + '" style="margin-top: 10px; height: 200px; width: 200px;" />';
        }
        infoWindow.setContent(content);
        infoWindow.open(map, this);
      });
    }
  
    for (var i = 0; i < numTrips; i++) {
      drawDayRoute(trips[i].stations, trips[i].color, map);
    }
  }

  render() {
    return (
      <div id="map-canvas" />
    );
  }
}

export default Map;


function drawDayRoute(visited, color, map) {
  var numVisited = visited.length;
  var dayCoords = [];

  for (var i = 0; i < numVisited; i++) {
    dayCoords.push({
      lat: stationLookup[visited[i]].lat,
      lng: stationLookup[visited[i]].long
    });
  }

  var dayLine = new google.maps.Polyline({
    path: dayCoords,
    geodesic: true,
    strokeColor: color,
    strokeOpacity: 1.0,
    strokeWeight: 2
  });

  dayLine.setMap(map);
}

function initialize() {
  var mapOptions = {
    center: { lat: 42.3615287, lng: -71.0677415 },
    zoom: 14,
    disableDefaultUI: false,
    fullscreenControl: false,
    mapTypeControl: false,
    streetViewControl: false,
    styles: mapStyles
  };

  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  var visited = [];
  var numTrips = trips.length;
  for (var i = 0; i < numTrips; i++) {
    visited = _.union(visited, trips[i].stations);
  }

  var numStations = stations.length;
  var numVisited = visited.length;

  var percentComplete = Math.round((numVisited / numStations) * 100);
  console.log(numVisited + ' stations visited, ' + (numStations - numVisited) + ' stations remaining, ' + numStations + ' stations total, ' + percentComplete + '% complete');

  var completedBar = document.getElementsByClassName('ProgressBar-completed')[0];
  completedBar.style.width = `${percentComplete}%`;

  var percentageEl = document.getElementsByClassName('ProgressBar-percentage')[0];
  percentageEl.innerHTML = `${percentComplete}%`;

  var stationsVisitedEl = document.getElementsByClassName('ProgressBar-stationsComplete')[0];
  stationsVisitedEl.innerHTML = `${numVisited} stations visited`;

  var numStationsEl = document.getElementsByClassName('ProgressBar-max')[0];
  numStationsEl.innerHTML = numStations;

  var reversedTrips = trips.slice().reverse();
  var tripHtml = [
    '<ul>',
    ...reversedTrips.map(trip => {
      const dateObj = moment(trip.date, 'YYYY-MM-DD');
      return `<li>${dateObj.format('MMM D, YYYY')} - ${trip.stations.length} stations</li>`;
    }),
    '</ul>'
  ].join('');
  var tripHistoryEl = document.getElementsByClassName('TripHistory')[0];
  tripHistoryEl.innerHTML = tripHtml;

  for (var i = 0; i < numStations; i++) {
    let isVisited = false;
    for (var j = 0; j < numVisited; j++) {
      if (stations[i].id === visited[j]) {
        isVisited = true;
        var marker = new google.maps.Marker({
          icon: {
            scaledSize: new google.maps.Size(20, 20),
            url: stations[i].photo || 'img/marker-filled.png',
            strokeColor: '#000000'
          },
          map: map,
          position: new google.maps.LatLng(stations[i].lat, stations[i].long),
          title: stations[i].name,
          photo: stations[i].photo,
          isLegacy: stations[i].isLegacy
        });
        break;
      }
    }
    if (!isVisited) {
      var marker = new google.maps.Marker({
        icon: {
          scaledSize: new google.maps.Size(20, 20),
          url: 'img/marker-outline.png'
        },
        map: map,
        position: new google.maps.LatLng(stations[i].lat, stations[i].long),
        title: stations[i].name,
        photo: stations[i].photo
      });
    }

    var infoWindow = new google.maps.InfoWindow();
    google.maps.event.addListener(marker, 'click', function () {
      var content = '<h4 style="margin: 0; width: 200px;">' + this.title + (this.isLegacy ? ' (Legacy)' : '') + '</h4>';
      if (this.photo) {
        content += '<img src="' + this.photo + '" style="margin-top: 10px; height: 200px; width: 200px;" />';
      }
      infoWindow.setContent(content);
      infoWindow.open(map, this);
    });
  }

  for (var i = 0; i < numTrips; i++) {
    drawDayRoute(trips[i].stations, trips[i].color, map);
  }
}

google.maps.event.addDomListener(window, 'load', initialize);
