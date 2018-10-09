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
      zoom: 16,
      pitch: 0,
      minZoom: 1, //restrict map zoom - buildings not visible beyond 13
      maxZoom: 17,
      container: 'map'
    });

  }

}
