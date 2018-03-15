import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PlayerPage } from '../player/player';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AdmobSerivce } from '../services/admob';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
  providers: [AdmobSerivce]
})
export class SearchPage {

  searchedtext: string;
  searchbar: string;
  page: any;
  videos: any;
  videoslength: any = "";
  more: any;
  constructor(public navCtrl: NavController,
    public http: HttpClient,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public myadmob: AdmobSerivce) {
  }

  doInfinite(infiniteScroll) {
    this.videoslength = "";
    // this.navCtrl.push(PlayerPage);
    this.page++;
    this.http.get('https://api.dailymotion.com/videos/?search="' + this.searchedtext + '"&fields=description,id,thumbnail_360_url,title&page=' + this.page + '&limit=100')
      .subscribe(res => {
        this.more = res;
        for (let child of this.more.list) {
          this.videos.push(child);
        }
        // console.log(this.page);
        infiniteScroll.complete();
        // console.log(this.videos);
        // console.log(this.videos.views_total);
      });

  }

  gotoplayerpage(parms, title, view) {
    this.navCtrl.push(PlayerPage,
      {
        message: parms,
        mytitle: title,
      });
  }

  searchByKeyword(event) {
    this.videoslength = "";
    // this.navCtrl.setRoot(this.navCtrl.getActive().component);
    this.page = 1;
    let loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loader.present();
    this.searchbar = event.target.value;
    this.searchedtext = event.target.value;
    this.searchedtext = this.searchedtext.split(' ').join('+');
    this.searchedtext = this.searchedtext.split('++').join('+');
    this.searchedtext = this.searchedtext.split('++').join('+');
    // console.log(this.searchedtext);
    return this.http.get('https://api.dailymotion.com/videos/?search="' + this.searchedtext + '"&fields=description,id,thumbnail_360_url,title&page=1&limit=100')
      .subscribe(res => {
        // console.log(res);
        this.videos = res;
        this.videos = this.videos.list;
        if (this.videos.length == 0) {
          this.videoslength = "Nothing Found...";
        }
        // console.log(this.videos);
        // this.loading = "Home";
        loader.dismiss();
      },
        error => {
          console.log("error : " + error.message);
        });

  }

  searchfromhome() {
    this.videoslength = "";
    this.page = 1;
    let loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loader.present();
    this.searchedtext = this.navParams.get('search');
    this.searchbar = this.searchedtext;
    this.searchedtext = this.searchedtext.split(' ').join('+');
    this.searchedtext = this.searchedtext.split('++').join('+');
    this.searchedtext = this.searchedtext.split('++').join('+');
    console.log(this.searchedtext);
    return this.http.get('https://api.dailymotion.com/videos/?search="' + this.searchedtext + '"&fields=description,id,thumbnail_360_url,title&page=1&limit=100')
      .subscribe(res => {
        // console.log(res);
        this.videos = res;
        this.videos = this.videos.list;
        if (this.videos.length == 0) {
          this.videoslength = "Nothing Found...";
        }
        // console.log("length is "+this.videoslength);
        // this.loading = "Home";
        loader.dismiss();
      },
        error => {
          console.log("error : " + error.message);
          loader.dismiss();
        });

  }

  ionViewDidLoad() {
    this.searchfromhome();
    this.myadmob.showinter();
    // console.log('ionViewDidLoad SearchpagePage');
  }

}
