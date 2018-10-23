import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'

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
    var popup = new mapboxgl.Popup({ offset: 25 })
    .setText('Some food.');

    // create DOM element for the marker
    var el = document.createElement('div');
    el.id = 'marker';

    // create the marker
    new mapboxgl.Marker(el)
    .setLngLat([-89.40696937253546,43.071498310397885])
    .setPopup(popup) // sets a popup on this marker
    .addTo(map);

  }

}