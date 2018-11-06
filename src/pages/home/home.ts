import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'
import { MapData } from './MapData';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  ionViewDidEnter() {

    /*Initializing Map*/
    mapboxgl.accessToken = 'pk.eyJ1IjoiYWVjaGFuIiwiYSI6ImNqbXd4ZmYzYTA0eWcza3J0NzVsNnNkcWoifQ.PQuBcFIs9STCQ6uf8DrJNw';
    var map = new mapboxgl.Map({
      style: 'mapbox://styles/aechan/cjmwxodn95lir2rmoq60ydb3m',
      center: [-89.4125, 43.0766],
      zoom: 15,
      pitch: 0,
      minZoom: 1, //restrict map zoom - buildings not visible beyond 13
      maxZoom: 17,
      container: 'map'
    });
    // map.on("load", function () {
    //   /* Image: An image is loaded and added to the map. */
    //   map.loadImage("https://i.imgur.com/MK4NUzI.png", function(error, image) {
    //       if (error) throw error;
    //       map.addImage("custom-marker", image);
    //       /* Style layer: A style layer ties together the source and image and specifies how they are displayed on the map. */
    //       map.addLayer({
    //         id: "markers",
    //         type: "symbol",
    //         /* Source: A data source specifies the geographic coordinate where the image marker gets placed. */
    //         source: {
    //           type: "geojson",
    //           data: {
    //             type: "FeatureCollection",
    //             features:[{"type":"Feature","geometry":{"type":"Point","coordinates":[-89.40696937253546,43.071498310397885]}}]}
    //         },
    //         layout: {
    //           "icon-image": "custom-marker",
    //         }
    //       });
    //     });
    // });
    
    // create the popup
    // var popup = new mapboxgl.Popup({ offset: 25 })
    //   .setText('Some food.');

    // // create DOM element for the marker
    // var el = document.createElement('div');
    // el.id = 'marker';

    // // create the marker
    // new mapboxgl.Marker(el)
    //   .setLngLat([-89.40696937253546, 43.071498310397885])
    //   .setPopup(popup) // sets a popup on this marker
    //   .addTo(map);
    

    // TODO: 1.try ro make geojson a external file; 2. use spreadsheet api to update data. 
    // Get coordinates from https://www.gps-coordinates.net/. Maybe can add feature that user can add fridges themselves
    var geojson = {
      type: 'FeatureCollection',
      features: [{
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-89.4155519, 43.077424]
        },
        properties: {
          title: 'Sullivan Residence Hall',
          description: "Sullivan's fridge is empty"
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-89.41778898239136, 43.07775948865735]
        },
        properties: {
          title: 'Dejope Residence Hall',
          description: "Dejope's fridge is stocked"
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-89.40695285797119, 43.07677990128432]
        },
        properties: {
          title: 'Elizabeth Waters Residence Hall',
          description: "Waters' fridge is stocked"
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-89.4012451171875, 43.07382537092813]
        },
        properties: {
          title: 'Chadbourne Residence Hall',
          description: "Chad's fridge are stocked"
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-89.40125584602356, 43.076764227759085]
        },
        properties: {
          title: 'College Liberary',
          description: "CoLi's fridge are stocked"
        }
      }]
    };

    // add markers to map
    geojson.features.forEach(function (marker) {

      // create a HTML element for each feature
      var el = document.createElement('div');
      el.id = 'marker';

      // make a marker for each feature and add to the map
      new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
        .setHTML('<h3>' + marker.properties.title + '</h3><p><div align="center">' + marker.properties.description + '</div></p>'))
        .addTo(map);
    });

  }

}