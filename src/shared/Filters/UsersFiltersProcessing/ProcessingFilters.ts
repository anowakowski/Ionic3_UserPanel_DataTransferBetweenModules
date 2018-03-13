import { FiltersBase } from "./filtersBase";
import { FilterSurname } from "./filteSurname";
import { FilterFirstName } from "./filterFirstName";
import { FilterStatus } from "./filterStatus";
import * as _ from 'lodash';

export class ProcessingFilters {

    public executeFilters(usersData:any[], filtersData:any[]){
        let filters = this.setFilters();
        let filteredUsers: any[] = [];
        _.forEach(filters, f => {
            filteredUsers = f.runFilter(usersData, filtersData);
            usersData = filteredUsers;
        });

        return filteredUsers;
    }

    private setFilters(): Array<FiltersBase>{
        let filters: Array<FiltersBase> = new Array<FiltersBase>();
        filters.push(new FilterFirstName());
        filters.push(new FilterSurname());
        filters.push(new FilterStatus())
        
        return filters;
    }
}
