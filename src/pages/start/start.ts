import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RateService } from '../services/rate';
import { CategoryPage } from '../category/category';
import { AdmobSerivce } from '../services/admob';

/**
 * Generated class for the StartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-start',
  templateUrl: 'start.html',
})
export class StartPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private _RATE       : RateService,
              public myadmob: AdmobSerivce) {
 
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad StartPage');
    this._RATE.requestRating();
    
  }

  gotocategory()
  {
    this.myadmob.showinter();
    this.navCtrl.push(CategoryPage)
  }

}
