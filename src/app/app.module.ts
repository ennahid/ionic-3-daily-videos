import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SearchPage } from '../pages/search/search';
import { PlayerPage } from '../pages/player/player';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { PlayerPageModule } from '../pages/player/player.module';
import { AdMobFree } from '@ionic-native/admob-free';
import { Toast } from '@ionic-native/toast';
import { AppRate } from '@ionic-native/app-rate';
import { AdmobSerivce } from '../pages/services/admob';
import { CategoryPage } from '../pages/category/category';
import { StartPage } from '../pages/start/start';
import { RateService } from '../pages/services/rate';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SearchPage,
    PlayerPage,
    CategoryPage,
    StartPage,
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    HttpClientModule,
    PlayerPageModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SearchPage,
    PlayerPage,
    CategoryPage,
    StartPage,
  ],
  providers: [
    StatusBar,
    AdMobFree,
    SplashScreen,
    AdmobSerivce,
    RateService,
    Toast,
    AppRate,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
