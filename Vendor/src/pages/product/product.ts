import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase,AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import firebase from 'firebase';
import { AngularFireAction } from 'angularfire2/database/interfaces';
import { MapPage } from '../map/map';
/**
 * Generated class for the ProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {
  products: Observable<any>;
  itemRef:AngularFireList<any>;
  items$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
  /*imageSource
  productPhoto;
*/
  constructor(public db :AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams) {
    this.itemRef= db.list('\products')
    //db.list('/products', ref => ref.orderByChild('quantity').equalTo('car'))
    
    this.products = this.itemRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
    
   /* this.imageSource='saad'
    this. getPhotoUrl() ;*/
  }

 /* getPhotoUrl() {
    firebase.storage().ref().child('images/'+this.imageSource+'.jpg').getDownloadURL().
      then((url) => {
        this.productPhoto = url;
      })
  }*/

  showMap(lat:number,long :number)
  { 
    this.navCtrl.push(MapPage, {
     lat,long
    })
  }

  

  deleteProduct(key: string)
  {
    this.itemRef.remove(key);
  }

}
