import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase,AngularFireList } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';
import { Platform, ActionSheetController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { TestPage } from '../test/test';
import { CarsPage } from '../cars/cars';
import { PhonesPage } from '../phones/phones';
import { EstatePage } from '../estate/estate';
import { MapPage } from '../map/map';
import { Facebook,FacebookLoginResponse  } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';


/**
 * 
 * Generated class for the CardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-card',
  templateUrl: 'card.html',
})
export class CardPage {

 
  products: Observable<any>;
  itemRef:AngularFireList<any>;
  
    constructor(
      private googleplus:GooglePlus,
      private fb:Facebook,
      public alertCtrl: AlertController,
      public platform: Platform,public fire:AngularFireAuth,
      public actionsheetCtrl: ActionSheetController, public navCtrl: NavController, public navParams: NavParams,public db: AngularFireDatabase) {
      
        this.itemRef= db.list('\products')
        this.products = this.itemRef.valueChanges();
      //console.log(this.users);
   /*   fire.auth.onAuthStateChanged(function(user){
        if(!user)
        {
          navCtrl.push(TestPage)
        }
      })*/
    }
    


    doRefresh(refresher) {
      console.log('Begin async operation', refresher);
  
      setTimeout(() => {
        console.log('Async operation has ended');
        refresher.complete();
      }, 2000);
    }
  
   

    showMap(lat:number,long :number)
    { 
      this.navCtrl.push(MapPage, {
       lat,long
      })
    }
  
  openMenu() {
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Categories',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Cars',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'car' : null,
          handler: () => {
            this.navCtrl.push(CarsPage)
          }
        },
        {
          text: 'Phons',
          icon: !this.platform.is('ios') ? 'phone-portrait' : null,
          handler: () => {
            this.navCtrl.push(PhonesPage)
          }
        },
        {
          text: 'Real-Estate',
          icon: !this.platform.is('ios') ? 'home' : null,
          handler: () => {
            this.navCtrl.push(EstatePage)
          }
        },
        {
          text: 'log-out',
          icon: !this.platform.is('ios') ? 'exit' : null,
          handler: () => {
            this.fire.auth.signOut();
            this.fb.logout(); 
            this.googleplus.logout();             
            this.navCtrl.setRoot(TestPage);
              let alert = this.alertCtrl.create({
                title: 'Sign-out',
                subTitle: 'Thanks for using this application',
                buttons: ['OK']
              });
              alert.present();
          
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
