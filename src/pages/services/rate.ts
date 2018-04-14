import { Injectable } from "@angular/core";
import { AppRate } from '@ionic-native/app-rate';


@Injectable()
export class RateService {
    constructor(private _RATE 	: AppRate) { }
    requestRating()
    {
        this._RATE.preferences = {
            displayAppName: 'Videos Downloader',
            usesUntilPrompt: 2,
            promptAgainForEachNewVersion: false,
            storeAppURL: {
              ios: '1216856883',
              android: 'market://details?id=com.fiverr.fiverr'
            },
            customLocale: {
              title: 'Rate %@?',
              message: 'If you enjoy using this app, would you mind taking a moment to rate it?',
              cancelButtonLabel: 'No, Thanks',
              laterButtonLabel: 'Remind Me Later',
              rateButtonLabel: 'Rate It Now'
            },
            callbacks: {
              onRateDialogShow: function(callback){
                console.log('rate dialog shown!');
              },
              onButtonClicked: function(buttonIndex){
                console.log('Selected index: -> ' + buttonIndex);
              }
            }
          };
       this._RATE.promptForRating(true);
    }
}