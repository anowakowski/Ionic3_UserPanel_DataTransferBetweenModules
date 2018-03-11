import { List } from "ionic-angular";

export abstract class FiltersBase {
    constructor(){
    }

    runFilter(tyusersData,  filtersData:any[]): any[]{
        throw new Error("Method not implemented.");
    }
}
