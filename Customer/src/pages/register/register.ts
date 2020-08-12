import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase,AngularFireList} from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { TestPage } from '../test/test';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
email:string='';
password:string='';
 
  users : AngularFireList<any>;
  constructor(public loadingCtrl: LoadingController,public toastCtrl: ToastController,public navCtrl: NavController, public navParams: NavParams,
  public db:AngularFireDatabase,public fire:AngularFireAuth ) {
    this.users = db.list('/users')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage')
  }/*
  creatAccount(username,email,password){
    this.users.push({
      username : username,
      email : email,
      password:password}).then(newUser=>{this.navCtrl.push(TestPage)})
    
  }*/
  creatuser()
  {
 
    this.fire.auth.createUserWithEmailAndPassword(this.email,this.password)
    .then(newUser=>{this.navCtrl.push(TestPage)
      let loader = this.loadingCtrl.create({
        content: "Please wait...",
        duration: 3000
      });
      loader.present()
      
      let toast = this.toastCtrl.create({
        message: 'User was added successfully',
        duration: 3000
      });
      toast.present();}).catch(function(error)
  {console.log(error)});
  
  
  }
 

}
