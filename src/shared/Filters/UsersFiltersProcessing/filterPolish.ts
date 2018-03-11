import { FiltersBase } from 'src/shared/Filters/UsersFiltersProcessing/filtersBase';

import * as _ from 'lodash';

export class FilterPolish implements FiltersBase {
    private readonly filterName: string = "namePolish";
    
        runFilter(usersData:any[], filtersData:any[] = null): any [] {
            let filter = _.find(filtersData, fd => fd.name == this.filterName);
            if (filter != null){
                let filterValueLower = filter.value.toLowerCase();
                let filterUsers = _.filter(usersData, ud => ud.namePolish.toLowerCase().includes(filterValueLower));
                return filterUsers;
            }

            return usersData;
        }
}
