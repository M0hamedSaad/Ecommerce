import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CardPage } from '../card/card';
import { ProfilePage } from '../profile/profile';
import { TestPage } from '../test/test';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { FirebaseApp } from 'angularfire2';
import { auth } from 'firebase/app';
/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1Root = CardPage;
  tab2Root = ProfilePage;
  
  constructor(public fire:AngularFireAuth,public navCtrl: NavController, public navParams: NavParams) {
  fire.auth.onAuthStateChanged(function(user){
      if(!user)
      {
        navCtrl.push(TestPage)
      }
    })
  }


}
