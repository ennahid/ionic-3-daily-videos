import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams ,LoadingController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { SearchPage } from '../search/search';
import { PlayerPage } from '../player/player';
import { AdmobSerivce } from '../services/admob';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('mysearch') mysearch ;
  videos: any;
  more: any;
  page = 1;
  searchbar: string;
  searchbarvisible = false;

  constructor(public navCtrl: NavController,
    private navParams: NavParams,
    public http: HttpClient,
    public loadingCtrl: LoadingController,
    public myadmob: AdmobSerivce)
    { }

  togglesearchbar()
  {
    this.searchbarvisible = !this.searchbarvisible;
    if(this.mysearch == null)
    {
      setTimeout(() => {
        this.mysearch.setFocus();
      }, 100);
    }
  }
  doInfinite(infiniteScroll) {
    // this.navCtrl.push(PlayerPage);
    this.page++;
    this.myadmob.showinter();
    this.http.get('https://api.dailymotion.com/videos?fields=description,id,thumbnail_360_url,title&page=' + this.page + '&limit=50')
      .subscribe(res => {
        this.more = res;
        for (let child of this.more.list) {
          this.videos.push(child);
        }
        infiniteScroll.complete();
      });
  }

  gotoplayerpage(parms, title, view) {
    this.navCtrl.push(PlayerPage,
      {
        message: parms,
        mytitle: title,
      })
  }

  searchByKeyword(event) {
    this.navCtrl.push(SearchPage,
      {
        search: event.target.value,
      });
    setTimeout(() => {
      this.searchbar = "";
      this.togglesearchbar();
    }, 1000);
  }

  getvideos() {
    let loader = this.loadingCtrl.create({
      content: 'Getting Videos...'
    });
    loader.present();
    return this.http.get('https://api.dailymotion.com/videos?fields=description,id,thumbnail_360_url,title&' + this.page + '&limit=30'+this.navParams.get('category'))
      .subscribe(res => {
        this.videos = res;
        this.videos = this.videos.list;
        loader.dismiss();
      },
        error => {
          console.log("error" + error);
          loader.dismiss();
        });
  }

  ngOnInit() {
    this.getvideos();
  }

}
