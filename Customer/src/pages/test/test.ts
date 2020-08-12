import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { CardPage } from '../card/card';
import { ProfilePage } from '../profile/profile';
import { TabsPage } from '../tabs/tabs';
import { AngularFireAuthModule, AngularFireAuth, _getAngularFireAuth } from 'angularfire2/auth';
import { FirebaseApp } from 'angularfire2';
import { auth } from 'firebase/app';
import { ToastController } from 'ionic-angular';
import { Tab } from 'ionic-angular/components/tabs/tab';
import { LoadingController } from 'ionic-angular';
import firebase from 'firebase'
import { Facebook,FacebookLoginResponse  } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
/**
 * Generated class for the TestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class TestPage {
  email:string=""
  password:string=""
  logginIN= false;
  user:any;
 


  constructor(public googlePlus:GooglePlus,private fb: Facebook,public loadingCtrl: LoadingController,public toastCtrl: ToastController,public navCtrl: NavController, public navParams: NavParams,public fire:AngularFireAuth) 
  {
    
    
  
  }

  goToregister()
  {
    this.navCtrl.push(RegisterPage);
  }

  login()
  {
    
    this.fire.auth.signInWithEmailAndPassword(this.email,this.password)
     
    .then(newUser=>{this.navCtrl.push(CardPage)
      let loader = this.loadingCtrl.create({
        content: "Please wait...",
        duration: 2000
      });
      loader.present()
      let toast = this.toastCtrl.create({
        message: 'Have fun ',
        duration: 3000
      });
      toast.present();}).catch(function(error)
  {alert("Invalid Username , or password")});
  
  
  }


  loginFacebook()
  {
    this.fire.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
    .then(res =>{
      this.navCtrl.push(TabsPage);
      console.log(res)
    })
    .catch(function(error)
    {console.log(error)})
    
    

  }

  loginGoogle()
  {
    this.fire.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then(res =>{
      this.navCtrl.push(TabsPage);
      console.log(res)
    })
    .catch(function(error)
    {console.log(error)})

  }

  loginTwitter()
  {
    this.fire.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider())
    .then(res =>{
      this.navCtrl.push(TabsPage);
      console.log(res)
    })
    .catch(function(error)
    {console.log(error)})
  }
  


  goTomain()
  {
   
    //console.log("email:"+this.email+"password:"+this.password)
   this.navCtrl.push(TabsPage);
  }

  loginFacebook1()
  {
   
    this.fb.login(['public_profile', 'user_friends', 'email'])
    .then((res: FacebookLoginResponse) => console.log('Logged into Facebook!', res))
    .catch(e => console.log('Error logging into Facebook', e));
    }
  /*  loginf()
    {

      this.fb.login(['public_profile', 'user_friends', 'email'])
      .then(res=>{
        if(res.status==="connected"){
          this.logginIN = true;
          this.getDetails(res.authResponse.userID);
    
        }else{
          this.logginIN=false;
        }
      })
    .catch(e => console.log('Error logging into Facebook', e));
    }

    getDetails(id){
      this.fb.api("/"+id+"/?fields=id,email,name,picture,gender",['public_profile']).then(res=>{
        console.log(res);
        this.user = res;
      }).catch(e=>{
        console.log(e);
      });
      }
*/
  loginGoogle1()
  {
    this.googlePlus.login({})
    .then(res =>{
      this.navCtrl.push(CardPage);
      console.log(res)
    })
    .catch(function(error)
    {console.log(error)})

  }

}
