import { FiltersBase } from 'src/shared/Filters/UsersFiltersProcessing/filtersBase';

import * as _ from 'lodash';

export class FilterEnglish implements FiltersBase {
    private readonly filterName: string = "engName";

    runFilter(usersData:any[], filtersData:any[] = null): any [] {
        let filter = _.find(filtersData, fd => fd.name == this.filterName);

        if (filter != null){
            let filterValueLower = filter.value.toLowerCase()

            let filterUsers = _.filter(usersData, ud => ud.nameEng.toLowerCase().includes(filterValueLower));
            return filterUsers;
        }
        return usersData;
    }
}
