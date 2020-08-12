import { Component, NgZone, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { Loading } from 'ionic-angular/components/loading/loading';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import firebase from 'firebase';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { errorHandler } from '@angular/platform-browser/src/browser';
import { ProductPage } from '../product/product';
import { Platform, ActionSheetController } from 'ionic-angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import 'rxjs/add/operator/filter';
import { Element } from '@angular/compiler';
import { MapPage } from '../map/map';
import{ NgModule } from '@angular/core';

import { AgmCoreModule } from '@agm/core';

try {
  firebase.initializeApp({
    apiKey: "AIzaSyBDITzryvu9oPBapt5jhwe9ZIKfB38_ejU",
    authDomain: "ionic-db-9a4c6.firebaseapp.com",
    databaseURL: "https://ionic-db-9a4c6.firebaseio.com",
    projectId: "ionic-db-9a4c6",
    storageBucket: "ionic-db-9a4c6.appspot.com",
    messagingSenderId: "886510838082"
  })
} catch (err) {
  // we skip the "already exists" message which is
  // not an actual error when we're hot-reloading
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack)
  }
}

const fb = firebase
export default fb

declare let google;


@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',


})
export class AddPage {

  products: AngularFireList<any>;

  mySelectedPhoto;
  Loading;
  currentPhoto;
  imageName;

  
  lat: number =30.177340 ;
  long: number=31.411171 ;

  locationset=false;
  appearance=false;
  appearanceLocation=false;
  
  constructor(
    public geolocation: Geolocation,
    public zone: NgZone,
    public db: AngularFireDatabase,
    public actionsheetCtrl: ActionSheetController,
    public platform: Platform,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController, public camera: Camera, public navCtrl: NavController,
    public navParams: NavParams) {

    this.products = this.db.list('/products');

  }
  goToMap()
  {
    this.navCtrl.push(MapPage)
  }



  click(event)
  {
    console.log(event)
   this.lat=event.coords.lat;
   this.long=event.coords.lng;
   this.locationset=true;
   
  }
  appear()
  {
    this.appearance=true;
    this.appearanceLocation=false;
  }
  close()
  {
    this.appearance=false;
  }

  startGps()
  {
     const loading =this.loadingCtrl.create({
       content:"Ftching your location "
     })
     loading.present();
    this.geolocation.getCurrentPosition()
    .then((location)=>
  {
    this.lat=location.coords.latitude
    this.long=location.coords.longitude
    this.appearance=false;
    this.appearanceLocation=true;
    loading.dismiss();
    })
    .catch((error)=>{
      console.log("Error : "+error)
    })

  }
 

  addproduct(title, description, price, quantity, category, time) {

    try {
      this.imageName = title + Math.floor((Math.random() * 6) + 1);
      this.products.push({
        title: title
        , description: description
        , price: price
        , quantity: quantity
        , category: category
        , lat: this.lat
        , long: this.long
        , image: this.imageName
        , time: firebase.database.ServerValue.TIMESTAMP

      })
        .then(newproduct => {
          let loader = this.loadingCtrl.create({
            content: "Please wait...",
            duration: 2000
          });
          loader.present();
     


        })
      this.upload();
    }
    catch (error) {
      console.log('Error :\nYou should Fill valid inputs ..  ')
    }
  }

  ///videa 41.42.43
  takePhoto() {
    const options: CameraOptions = {
      quality: 100,
      targetHeight: 200,
      targetWidth: 200,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    }
    this.camera.getPicture(options).then((imageData) => {
      this.Loading = this.loadingCtrl.create({
        content: "Please wait...",
        duration: 2000
      });
      this.Loading.present()
      this.mySelectedPhoto = this.dataURLBlob('data:image/jpeg;base64,' + imageData);//piv saved here
      this.Loading.dismiss()
      this.currentPhoto = 'data:image/jpeg;base64,' + imageData;

    }, (err) => {
      console.log(err);
    });
  }




  selectPhoto(): void {
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      quality: 100,
      encodingType: this.camera.EncodingType.JPEG,
    }).then((imageData) => {
      this.Loading = this.loadingCtrl.create({
        content: "Please wait...",
        duration: 2000
      });
      this.Loading.present()
      this.mySelectedPhoto = this.dataURLBlob('data:image/jpeg;base64,' + imageData);//piv saved here
      this.Loading.dismiss()
      this.currentPhoto = 'data:image/jpeg;base64,' + imageData;

    }, (err) => {
      console.log(err);
    });
  }




  dataURLBlob(myUrl) {
    let binary = atob(myUrl.split(',')[1]);
    let array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i))

    }
    return new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
  }

  upload() {
    if (this.mySelectedPhoto) {
      var uploadTask = firebase.storage().ref().child('images/' + this.imageName + '.jpg').put(this.mySelectedPhoto);
      uploadTask.then(this.onSuccess, this.onErrors);
    }
  }


  onSuccess = (snapshot) => {
    this.currentPhoto = snapshot.downloadURL;
    this.Loading.dismiss();


  }

  onErrors = (error) => {
    console.log(error);
    this.Loading.dismiss();
  }



  openMenu() {
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Types',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Camera',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'camera' : null,
          handler: () => {
            this.takePhoto()

          }
        },
        {
          text: 'Device',
          icon: !this.platform.is('ios') ? 'image' : null,
          handler: () => {
            this.selectPhoto()
          }
        },
        {
          text: 'Cancel',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }



}
