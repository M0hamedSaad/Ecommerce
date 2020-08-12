import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase,AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import firebase from 'firebase';
import { MapPage } from '../map/map';
/**
 * Generated class for the CarsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cars',
  templateUrl: 'cars.html',
})
export class CarsPage {
  products: Observable<any>;
  itemRef:AngularFireList<any>;

  constructor(public db :AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams) {
    this.itemRef= db.list('/products', ref => ref.orderByChild('category').equalTo('Cars'))
    //this.itemRef= db.list('/products', ref => ref.orderByChild("Time").limitToLast(100))
    
   this.products = this.itemRef.snapshotChanges().map(changes => {
    return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
  });
  }

  showMap(lat:number,long :number)
  { 
    this.navCtrl.push(MapPage, {
     lat,long
    })
  }
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
}
