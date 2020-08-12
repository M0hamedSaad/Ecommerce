import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AddPage } from '../pages/add/add';
import { NotifyPage } from '../pages/notify/notify';
import { ProductPage } from '../pages/product/product';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import firebase from 'firebase';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { MapPage } from '../pages/map/map';

import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    AddPage,
    NotifyPage,
    ProductPage,
    MapPage
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebse),
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyAdz4iU_Oxt3TgflJiNALMBg67MmvMvHhQ' 
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    AddPage,
    NotifyPage,
    ProductPage,
    MapPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    AngularFireDatabase,   
    Geolocation,

    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
