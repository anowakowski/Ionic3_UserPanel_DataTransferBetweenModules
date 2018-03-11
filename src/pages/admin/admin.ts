import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ModalController, Events, ToastController, ItemSliding } from 'ionic-angular';
import { UserService, FilterService } from '../../shared/shared' //from 'sharedPath/shared'
import { NewUserPage, EditUserPage, FiltersPage } from '../pages';

import * as _ from 'lodash';
import { Model } from './model';

@Component({
  templateUrl: 'admin.html'
})
export class AdminPage {

  filtersData:any[] = [];

  constructor(public actionSheetCtrl: ActionSheetController, 
    public modalCtrl: ModalController,) {
  }

  ionViewDidLoad() {
  }

  changeLanguage(){
  }
}
