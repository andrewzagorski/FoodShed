import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'
import rp from 'request-promise';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  markers: any[];
  map: any;
  constructor(public navCtrl: NavController) {
    this.markers = [];
  }

  ionViewDidEnter() {
    /*Initializing Map*/
    mapboxgl.accessToken = 'pk.eyJ1IjoiYWVjaGFuIiwiYSI6ImNqbXd4ZmYzYTA0eWcza3J0NzVsNnNkcWoifQ.PQuBcFIs9STCQ6uf8DrJNw';
    this.map = new mapboxgl.Map({
      style: 'mapbox://styles/aechan/cjmwxodn95lir2rmoq60ydb3m',
      center: [-89.4125, 43.0766],
      zoom: 15,
      pitch: 0,
      minZoom: 1, //restrict map zoom - buildings not visible beyond 13
      maxZoom: 17,
      container: 'map'
    });

    const url = 'https://script.google.com/macros/s/AKfycbxGZ9kAERX_j5d16pSNKXPfMpZ5HGNloqQHB58riPYWxUZL-pA/exec'
    this.update(url);
    // update data every 10 secs
    setInterval(()=>{
      this.update(url);
    }, 10000);
  }

  update(url) {
    rp.get(url, (error, response, body) => {
      return body;
    })
    // add markers to map
    .then((body) => {
      let geojson = JSON.parse(body)

      
      // clear all old markers
      this.markers.forEach(element => {
        element.remove();
      });
      this.markers = [];

      geojson.features.forEach((marker) => {
        // create a HTML element for each feature
        let el = document.createElement('div');
        el.id = 'marker';

        // make a marker for each feature and add to the map and keep track in this.markers
        this.markers.push(new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
        .setHTML('<h3>' + marker.properties.title + '</h3>'
          + '<p><div align="center" style="font-size: 1.5em;">' + (marker.properties.description?"This fridge is stocked.":"This fridge is empty.") + '</div></p>'))
          .addTo(this.map));          
      });
    });
  }
}
  