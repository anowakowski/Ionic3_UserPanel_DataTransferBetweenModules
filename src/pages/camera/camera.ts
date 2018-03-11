import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html',
})
export class CameraPage {

  public base64Image: string;
  public showPicture: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera,  public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CameraPage');
  }

  goToRootPage(){
    this.navCtrl.popToRoot();
  }

  tappedPhoto(){
    const me = this;
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    const toast = me.toastCtrl;

    this.camera.getPicture(options).then((imageData) => {
      let createToast = toast.create({
        message:'photo was successfully',
        duration: 3000,
        position: 'top'
      });

      me.base64Image = "data:image/jpeg;base64," + imageData;
      me.showPicture = true;
      
      let base64Image = 'data:image/jpeg;base64,' + imageData;
     }, (err) => {
      let createToast = toast.create({
        message:'photo - error: ' + err,
        duration: 3000,
        position: 'top'
      });
     });

  }
  

}
