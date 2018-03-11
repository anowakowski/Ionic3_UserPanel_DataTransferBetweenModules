import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  templateUrl: 'new-user.html',
})
export class NewUserPage {

  constructor() {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewUserPage');
  }

  save(){
    //this.submitAttempt = true;

    /*if (this.userData.valid){
      let alert = this.alertCtrl.create({
        title: 'added new user',
        subTitle: 'add user succesfuly',
        buttons:['OK']
      });

     alert.present();*/

    


  }
}
