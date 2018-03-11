import { Component, Output, EventEmitter } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ViewController } from 'ionic-angular';
import { FilterService } from '../../shared/shared';

import * as _ from 'lodash';

@Component({
  templateUrl: 'filters.html',
})
export class FiltersPage {
  
  engName:string = null;
  persId:string = null;
  rolesData:any[] = [];
  statusList: any[];
  status: any;
  rolesValue: any;
  filtersData: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, public viewCtrl: ViewController, private filterService: FilterService) {
    this.filtersData = navParams.data.parametersData;
  }

  ionViewDidLoad() {
    this.prepareFilteredData();
    this.setSelectedValueFromFilterData();
  }

  onTappedFilters(){
    const me = this;

    let filters = [];

    me.filterService.createFilter(filters, 'engName', me.engName);
    me.filterService.createFilter(filters, 'personalId', me.persId);
    me.filterService.createFilter(filters, "status", me.status);
    me.filterService.createFilter(filters, "roles", me.rolesValue);
    
    me.events.publish("shareFiltersData", filters);
    me.viewCtrl.dismiss();
  }

  private setSelectedValueFromFilterData(){
    const me = this;

    if (me.filterService.checkIfFilterExists( "status", me.filtersData)){
      me.status = me.filterService.getFilterValue(me.filtersData, "status");
    }
    if (me.filterService.checkIfFilterExists( "engName", me.filtersData)){
      me.engName = me.filterService.getFilterValue(me.filtersData, "engName");
    }
    if (me.filterService.checkIfFilterExists( "personalId", me.filtersData)){
      me.persId = me.filterService.getFilterValue(me.filtersData, "personalId");
    }
    if (me.filterService.checkIfFilterExists( "roles", me.filtersData)){
      me.rolesValue = me.filterService.getFilterValue(me.filtersData, "roles");
    }
  }

  private prepareFilteredData():void{
    const me = this;
    let filteredData = me.filterService.getFilterData();

    _.forEach(filteredData, fd => {
      me.statusList = me.setFilterData(fd, me.statusList, "status");
      me.rolesData = me.setFilterData(fd, me.rolesData, "role");
    });
  }

  private setFilterData(filter, prop:any[], filterName:string){
    if (filter.name.includes(filterName) && prop !== null){
      return filter.values;
    }
    return prop;
  }
}
