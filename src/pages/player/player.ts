import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { AdmobSerivce } from '../services/admob';

@IonicPage()
@Component({
  selector: 'page-player',
  templateUrl: 'player.html',
  providers: [AdmobSerivce]
})
export class PlayerPage {

  video_id: any;
  video_link: string;
  video_title: string;
  related_videos: any;

  constructor(public sanitizer: DomSanitizer,
    public loadingCtrl: LoadingController,
    public http: HttpClient,
    public navCtrl: NavController,
    private navParams: NavParams,
    public myadmob: AdmobSerivce) {
    // alert(this.video_id);
  }

  begindownload()
  {
    this.myadmob.download();
    this.myadmob.showinter();
  }

  gotoplayerpage(parms, title, view) {
    this.navCtrl.push(PlayerPage,
      {
        message: parms,
        mytitle: title,
      });
  }

  ionViewDidLoad() {
    // this.video_id = "hello";
    this.myadmob.showinter();
    this.video_id = this.navParams.get('message');
    this.video_title = this.navParams.get('mytitle');
    let loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loader.present();
    this.video_link = "http://www.dailymotion.com/embed/video/" + this.video_id;
    this.video_link = this.video_link.replace('file:', '');

    this.http.get("https://api.dailymotion.com/video/" + this.video_id + "/related?fields=description,id,thumbnail_360_url,title,url,&limit=5")
      .subscribe(res => {
        this.related_videos = res;
        this.related_videos = this.related_videos.list;
        loader.dismiss();
      }, (err) => {
        console.log(err);
        loader.dismiss();
      });
  }
}
