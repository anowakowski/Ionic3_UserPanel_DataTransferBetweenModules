import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ModalController, Events, ToastController, ItemSliding } from 'ionic-angular';
import { UserService, FilterService } from '../../../shared/shared' 
import { NewUserPage, EditUserPage, FiltersPage } from '../../pages';

import * as _ from 'lodash';

@Component({
  selector: 'app-users-list',
  templateUrl: 'users-list-component.html',
})
export class UsersListComponent {
  queryName: string;
  usersData: any[];
  userLength: number;
  users = [];
  shouldShowFilterCard: boolean = false;
  isFilterFirstName: boolean = false;
  isFilterSurname: boolean = false;
  isFilterPersonalId: boolean = false;
  isFilterStatus: boolean = false;

  filtersData:any[] = [];
  

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private userService: UserService, 
    public actionSheetCtrl: ActionSheetController, 
    public modalCtrl: ModalController,
    private events: Events, 
    private filterService: FilterService,
    private toastCtrl: ToastController) {
  }

  ngOnInit() {
    this.userService.getUserList().then(response => {
      this.usersData = response as any[];
      this.userLength = this.usersData.length;
      this.users = this.usersData;
    });


    this.events.subscribe('shareFiltersData', (filterData) => {
      this.refreshFilters(filterData);
    });
  }

  ionViewDidLoad() {
  }

  deleteFilterChip(chip: Element, filterName:string) {
    const me =this;

    chip.remove();

    me.users = me.usersData;
    me.filterService.removeFilter(me.filtersData, filterName)
    me.refreshFilters();
  }

  refreshFilters(filterData = null){
    const me = this;
    
    if (filterData){
      me.filterService.addFilter(me.filtersData, filterData);
    }

    let filteredUsersData = [];
    filteredUsersData = me.filterService.executeAllProcessingFilters(me.usersData, me.filtersData);
    me.users = filteredUsersData; 
    me.userLength = filteredUsersData.length;

    this.displayFiltersElement(me);
  }

  ionViewWillUnload(){
    this.events.unsubscribe('shareFiltersData');
  }

  toggleMainFab(){
    this.prepareActionSheet();
  }

  updateName(){
    let queryNameLower = this.queryName.toLocaleLowerCase();
  }

  userTapped(event, user){
    this.prepareModalDialog(EditUserPage, user, "Edit user");
  }

  filtersTapped(){
    this.prepareActionSheet()
  } 

  onFilterUserByFirstName(){
    const me = this;

    let searchBarValue = me.queryName;

    if (searchBarValue || searchBarValue.length !== 0){
      me.filterService.createFilter(me.filtersData, "firstName", me.queryName);
      
    } else {
      me.filterService.removeFilter(me.filtersData, "firstName");
      this.displayFiltersElement(me);
    }

    me.refreshFilters();
  }

  onCancelFilterByPolishName(event){
    console.log("cancel filter");
  }

  private displayFiltersElement(me: this) {
    me.isFilterPersonalId = me.filterService.shouldDisplayFilter("personalId", me.filtersData);
    me.isFilterSurname = me.filterService.shouldDisplayFilter("surname", me.filtersData);
    me.isFilterStatus = me.filterService.shouldDisplayFilter("status", me.filtersData);
    me.isFilterFirstName = me.filterService.shouldDisplayFilter("firstName", me.filtersData);

    me.shouldShowFilterCard = me.filterService.shouldDisplayFilterCard(me.filtersData);
  }

  private prepareModalDialog(page:any, parametersData:any = null, modalTitle:string = null) {
    const editUserModel = this.modalCtrl.create(page, { parametersData, modalTitle });
    editUserModel.present();
  }

  private prepareActionSheet(){
    let actionSheet = this.actionSheetCtrl.create({
      //title: 'submenu',
      buttons: [
        {
          text: 'Add new user',
          handler: () => {
            this.prepareModalDialog(NewUserPage, null, "Add new user");
          }
        },
        {
          text: 'Fiters',
          handler: () => {
            this.prepareModalDialog(FiltersPage, this.filtersData, "Filters");
          }
        },        
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();    
  }

}
