import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';




import firebase from 'firebase';
import { MyApp } from './app.component';
import { TestPage } from '../pages/test/test';
import { RegisterPage } from '../pages/register/register';
import { ProfilePage } from '../pages/profile/profile';
import { CardPage } from '../pages/card/card';
import { MenuPage } from '../pages/menu/menu';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { TabsPage } from '../pages/tabs/tabs';
import { CarsPage } from '../pages/cars/cars';
import { PhonesPage } from '../pages/phones/phones';
import { EstatePage } from '../pages/estate/estate';
import { MapPage } from '../pages/map/map';
import { Geolocation } from '@ionic-native/geolocation';
import { Facebook,FacebookLoginResponse } from '@ionic-native/facebook';
import { AgmCoreModule } from '@agm/core';
import { GooglePlus } from '@ionic-native/google-plus';
import { Push } from '@ionic-native/push';



export const  config = {
  apiKey: "AIzaSyBDITzryvu9oPBapt5jhwe9ZIKfB38_ejU",
  authDomain: "ionic-db-9a4c6.firebaseapp.com",
  databaseURL: "https://ionic-db-9a4c6.firebaseio.com",
  projectId: "ionic-db-9a4c6",
  storageBucket: "ionic-db-9a4c6.appspot.com",
  messagingSenderId: "886510838082"
};



@NgModule({
  declarations: [
    MyApp,
    TestPage,
    RegisterPage,
    CardPage,
    MenuPage,
    ProfilePage,
    TabsPage,
    CarsPage,
    PhonesPage,
    EstatePage,
    MapPage
    


  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyAdz4iU_Oxt3TgflJiNALMBg67MmvMvHhQ' 
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ProfilePage,
    TestPage,
    RegisterPage,
    CardPage,
    MenuPage,
    TabsPage,
    CarsPage,
    PhonesPage,
    EstatePage,
    MapPage
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    Geolocation,
    Facebook,
    GooglePlus,
    Push,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})


export class AppModule {}
