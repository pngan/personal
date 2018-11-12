import { Component, OnInit } from '@angular/core';
import { MenuProviderService } from '../menu-provider.service';
import { SearchService } from '../search.service';

export class FieldValue {
  Value: string;
  Display: string;
}
export class Menu {
  FieldName: string;
  FieldValues: FieldValue[];
}

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent implements OnInit {

  constructor(private menuService: MenuProviderService, private searchService: SearchService) { }

  allMenus: Array<Menu>;
  makeMenu: FieldValue[];
  currentMake: string; // first will be selected by default by browser

  modelMenu: FieldValue[];
  currentModel: string;
  bodyStyleMenu: FieldValue[];
  currentBodyStyle: string;
  regionMenu: FieldValue[];
  currentRegion: string;
  transmissionTypeMenu: FieldValue[];
  currentTranmissionType: string;

  cars: SearchResult[];


  async setMake(make: any) {

    this.currentModel = undefined;
    this.currentBodyStyle = undefined;
    this.currentTranmissionType = undefined;


    this.currentMake = make.target.value;
    console.log(`%o`, this.currentMake);
    const queryParameters = new QueryParameters();
    queryParameters.make = this.currentMake;
    queryParameters.region = this.currentRegion;
    this.allMenus =  await this.menuService.getMenuAsync(queryParameters);

    this.updateModelMenu();
    this.updateRegionMenu();
    this.updateTransmissionTypeMenu();
    this.updateBodyStyleMenu();
  }

  updateMakeMenu() {
    this.makeMenu = null;
    for (const menu of this.allMenus) {
      if (menu.FieldName === 'make') {
        this.modelMenu = menu.FieldValues;
      }
    }
  }

  updateModelMenu() {
    this.modelMenu = null;
    for (const menu of this.allMenus) {
      if (menu.FieldName === 'model' && menu.FieldValues.length > 0) {
        this.modelMenu = menu.FieldValues;
      }
    }
  }
  updateRegionMenu() {
    this.regionMenu = null;
    for (const menu of this.allMenus) {
      if (menu.FieldName === 'location' && menu.FieldValues.length > 0) {
        this.regionMenu = menu.FieldValues;
      }
    }
  }
  updateTransmissionTypeMenu() {
    this.transmissionTypeMenu = null;
    for (const menu of this.allMenus) {
      if (menu.FieldName === 'transmission' && menu.FieldValues.length > 0) {
        this.transmissionTypeMenu = menu.FieldValues;
      }
    }
  }
  updateBodyStyleMenu() {
    this.bodyStyleMenu = null;
    for (const menu of this.allMenus) {
      if (menu.FieldName === 'bodytype' && menu.FieldValues.length > 0) {
        this.bodyStyleMenu = menu.FieldValues;
      }
    }
  }


  async setModel(model: any) {
    this.currentBodyStyle = undefined;
    this.bodyStyleMenu = undefined;
    this.currentTranmissionType = undefined;
    this.transmissionTypeMenu = undefined;
    this.currentRegion = undefined;
    this.regionMenu = undefined;

    this.currentModel = model.target.value;
    console.log(`%o`, this.currentModel);
    const queryParameters = new QueryParameters();
    queryParameters.make = this.currentMake;
    queryParameters.model = this.currentModel;
    this.allMenus =  await this.menuService.getMenuAsync(queryParameters);

    this.updateRegionMenu();
    this.updateTransmissionTypeMenu();
    this.updateBodyStyleMenu();
  }

  async setRegion(region: any) {
    this.currentBodyStyle = undefined;
    this.bodyStyleMenu = undefined;
    this.currentTranmissionType = undefined;
    this.transmissionTypeMenu = undefined;

    this.currentRegion = region.target.value;
    console.log(`%o`, this.currentRegion);
    const queryParameters = new QueryParameters();
    queryParameters.make = this.currentMake;
    queryParameters.model = this.currentModel;
    queryParameters.region = this.currentRegion;
    this.allMenus =  await this.menuService.getMenuAsync(queryParameters);

    this.updateTransmissionTypeMenu();
    this.updateBodyStyleMenu();
  }

  async ngOnInit() {
    this.modelMenu = null;
    this.regionMenu = null;
    this.transmissionTypeMenu = null;
    this.bodyStyleMenu = null;


    console.log('got data');
    this.allMenus =  await this.menuService.getMenuAsync(new QueryParameters());

    this.makeMenu = null;
    this.modelMenu = null;
    for (const menu of this.allMenus) {
      if (menu.FieldName === 'make') {
        this.makeMenu = menu.FieldValues;
      }
    }
    console.log('got data');
    console.log('%o', this.allMenus);
  }


  async onPerformSearchOrig() {
    const searchParams = new SearchParameters();
    if (this.currentMake) {
      searchParams.make = encodeURIComponent(this.currentMake);
    }
    if (this.currentModel) {
      searchParams.model = encodeURIComponent(this.currentModel);
    }
    if (this.currentRegion) {
      searchParams.region = encodeURIComponent(this.currentRegion);
    }
    if (this.currentBodyStyle) {
      searchParams.body = encodeURIComponent(this.currentBodyStyle);
    }
    if (this.currentTranmissionType) {
      searchParams.transmission = encodeURIComponent(this.currentTranmissionType);
    }
    const result = await this.searchService.getSearchResultsAsync(searchParams);
  }

  async onPerformSearch() {
    const searchParams = new SearchParameters();
    if (this.currentMake) {
      searchParams.make = this.currentMake;
    }
    if (this.currentModel) {
      searchParams.model = this.currentModel;
    }
    if (this.currentRegion) {
      searchParams.region = this.currentRegion;
    }
    if (this.currentBodyStyle) {
      searchParams.body = this.currentBodyStyle;
    }
    if (this.currentTranmissionType) {
      searchParams.transmission = this.currentTranmissionType;
    }
    this.cars = await this.searchService.getSearchResultsAsync(searchParams) as SearchResult[];
    console.log(`Results are %o`,  this.cars);
  }
}

export class SearchParameters {
  make: string;
  model: string;
  region: string;
  body: string;
  transmission: string;
  price_lo: string;
  price_hi: string;
  year_lo: string;
  year_hi: string;
  kms_lo: string;
  kms_hi: string;
}

export class QueryParameters {
  make: string;
  model: string;
  bodyStyle: string;
  region: string;
  tranmissionStyle: string;
}

export class SearchResult {
  title: string;
  price: string;

  mileage: string;
  itemLink: string;
  imageLink: string;

}
