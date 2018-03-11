import { Injectable } from '@angular/core';

import { ProcessingFilters } from './UsersFiltersProcessing/ProcessingFilters';
import * as _ from 'lodash';

@Injectable()
export class FilterService {

    private readonly filtersProcessing: ProcessingFilters
    constructor() { 
        this.filtersProcessing = new ProcessingFilters();        
    }

    shouldDisplayFilter(filterName: string, filterData): any {
        var result =_.some(filterData, fd => {
            return fd.name == filterName;
        })
        
        return result;
    }

    shouldDisplayFilterCard(filtersData)    {
        return this.checkIfIsExistingFiltersData(filtersData);
    }

    createFilter(filters:any[], filterName:string, filterData: string= null): void{
        const me = this;
        if (me.checkIfFilterExists(filterName, filters)){
            me.overrideExistingFilter(filters, filterName, filterData);
        } else if (filterData !== null){
            me.setNewFilters(filters, filterName, filterData);
        }
    }

    removeFilter(filters: any[], filterName: string) {
        _.remove(filters, f => f.name == filterName);
    }

    executeAllProcessingFilters(userData, filters): any[]{
        const me = this;

        return me.filtersProcessing.executeFilters(userData, filters);
    }

    getFilterData(){
        return [
            {name:"status", values:["All", "Active", "Deactived"]},
            {name:"role", values:["Admin", "Audit", "President"]}
        ];
    }

    addFilter(filters:any[], filtersToAdd: any[]){
        _.forEach(filtersToAdd, f => filters.push(f));
    }

    checkIfFilterExists(filterName: string, filterData: any[]):boolean{
        return _.some(filterData, fd => fd.name == filterName);
    }

    getFilterValue(filters: any[], filterName: string): any{
        return _.find(filters, fs => fs.name == filterName).value;
    }

    private setNewFilters(filters:any[], fiterName:string, filterData: string) : void{
        if (filterData !== null){
            filters.push({name: fiterName, value: filterData});
        }
    }

    private checkIfIsExistingFiltersData(filters: any[]){
        return _.some(filters, fs => fs);
    }

    private overrideExistingFilter(filters: any[], filterName: string, filterData: string): void{
        const me = this;
        me.removeFilter(filters, filterName);
        me.setNewFilters(filters, filterName, filterData);
    }


}