import { Component, NgZone, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import 'rxjs/add/operator/filter';
import { Element } from '@angular/compiler';



//declare let google;
@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  lat ;
  long;
  //lat: number =30.177340 ;
  //long: number=31.411171 ;
  //locationset=false;

  constructor
  (
    public geolocation: Geolocation,
    public zone: NgZone,public navCtrl: NavController, public navParams: NavParams) {
      this.lat=navParams.get("lat")
      this.long=navParams.get("long")
      
  }

  /*click(event)
  {
    console.log(event)
   this.lat=event.coords.lat;
   this.long=event.coords.lng;
   this.locationset=true;
   
  }*/


}
