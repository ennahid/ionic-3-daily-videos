import { Injectable } from "@angular/core";
import { Toast } from '@ionic-native/toast';
import { AdMobFree, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';


@Injectable()
export class AdmobSerivce {
    constructor(private admobFree: AdMobFree,
        private toast: Toast) {
    }


    showinter() {
        const interstitialConfig: AdMobFreeInterstitialConfig = {
            // id: 'ca-app-pub-8203097758766986/1995669576',
            isTesting : true,
        };  
        this.admobFree.interstitial.config(interstitialConfig)
        this.admobFree.interstitial.prepare()
            .then(() => {
                this.toast.show(`ad shown`, '2000', 'bottom').subscribe(
                    toast => {
                      console.log(toast);
                    }
                  );
                this.admobFree.interstitial.show();
            })
            .catch(e => console.log(e));
    }
    // showinter()
    // {
    //     console.log('hello admob service');
    // }

    download()
    {
        this.toast.show(`Preparing Video for Download...`, '5000', 'bottom').subscribe(
            toast => {
              console.log(toast);
            }
          );
    }

}