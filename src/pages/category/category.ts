import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AdmobSerivce } from '../services/admob';

@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public myadmob: AdmobSerivce) {
  }

  sendCategory(param : string)
  {
    this.myadmob.showinter();
    console.log('bobo'+param);
    this.navCtrl.push(HomePage,
      {
        category : '&tags='+param
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryPage');
  }

}
