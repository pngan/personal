import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { AtService } from '../at.service';
import { IFieldValues, IFieldValue, QueryParams, IResultDto } from '../../../../at-shared/dto/at-dto';

interface IPriceItem {
  value: number;
  text: string;
}

interface IYearItem {
  value: number;
  text: string;
}

interface IDistItem {
  value: number;
  text: string;
}
@Component({
  selector: 'at-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnChanges {

  enableHeader: boolean;
  enableMain: boolean;
  enableRight: boolean;
  enableFooter: boolean;

  currentMake: string; // first will be selected by default by browser

  menuModel: IFieldValue[];
  currentModel: string;
  menuRegion: IFieldValue[];
  currentRegion: string;
  menuMakes: IFieldValue[];

  priceOptions: IPriceItem[];

  priceOptionsLow: Array<IPriceItem>;
  priceOptionsHigh: Array<IPriceItem>;

  public priceLow: number;

  public priceHigh: number;

  yearOptions: IYearItem[];

  yearOptionsLow: Array<IYearItem>;
  yearOptionsHigh: Array<IYearItem>;
  public yearLow: number;
  public yearHigh: number;

  distOptions: IDistItem[];

  distOptionsLow: Array<IDistItem>;
  distOptionsHigh: Array<IDistItem>;
  public distLow: number;
  public distHigh: number;

  public searchResults: IResultDto[];

  constructor(private atService: AtService) {
    this.menuMakes = new Array<IFieldValue>();
    this.priceOptions = [
      {
        value: 0,
        text: 'Low'
      },
      {
        value: 2000,
        text: '2,000'
      },
      {
        value: 5000,
        text: '5,000'
      },
      {
        value: 7000,
        text: '7,000'
      },
      {
        value: 10000,
        text: '10,000'
      },
      {
        value: 15000,
        text: '15,000'
      },
      {
        value: 20000,
        text: '20,000'
      },
      {
        value: 30000,
        text: '30,000'
      },
      {
        value: 50000,
        text: '50,000'
      },
      {
        value: 1000000,
        text: 'High'
      },
    ];


    this.yearOptions = [
      {
        value: 1900,
        text: 'Old'
      },
      {
        value: 1950,
        text: '1950'
      },
      {
        value: 1960,
        text: '1960'
      },
      {
        value: 1970,
        text: '1970'
      },
      {
        value: 1980,
        text: '1980'
      },
      {
        value: 1990,
        text: '1990'
      },
      {
        value: 1995,
        text: '1995'
      },
      {
        value: 2000,
        text: '2000'
      },
      {
        value: 2005,
        text: '2005'
      },
      {
        value: 2010,
        text: '2010'
      },
      {
        value: 2011,
        text: '2011'
      },
      {
        value: 2012,
        text: '2012'
      },
      {
        value: 2013,
        text: '2013'
      },
      {
        value: 2014,
        text: '2014'
      },
      {
        value: 2015,
        text: '2015'
      },
      {
        value: 2016,
        text: '2016'
      },
      {
        value: 2017,
        text: '2017'
      },
      {
        value: 2018,
        text: '2018'
      },
      {
        value: 2019,
        text: '2019'
      },
      {
        value: 2020,
        text: 'New'
      }
    ];

    this.distOptions = [
      {
        value: 0,
        text: 'Any'
      },
      {
        value: 20000,
        text: '20000'
      },
      {
        value: 50000,
        text: '50000'
      },
      {
        value: 80000,
        text: '80000'
      },
      {
        value: 100000,
        text: '100000'
      },
      {
        value: 150000,
        text: '150000'
      },
      {
        value: 200000,
        text: '200000'
      },
      {
        value: 1000000,
        text: 'Any'
      }
    ];

  }

  ngOnInit() {
    this.atService.getMakes().subscribe((makes: IFieldValues[]) => {
      this.menuMakes = makes[0].FieldValues;
      console.dir(makes[0].FieldValues);
    });

    this.priceOptionsLow = this.priceOptions.slice(0, -1);
    this.priceOptionsHigh = this.priceOptions.slice(1);
    this.priceHigh = this.priceOptions[this.priceOptions.length - 1].value;
    this.priceLow = this.priceOptions[0].value;

    this.yearOptionsLow = this.yearOptions.slice(0, -1);
    this.yearOptionsHigh = this.yearOptions.slice(1);
    this.yearHigh = this.yearOptions[this.yearOptions.length - 1].value;
    this.yearLow = this.yearOptions[0].value;

    this.distOptionsLow = this.distOptions.slice(0, -1);
    this.distOptionsHigh = this.distOptions.slice(1);
    this.distHigh = this.distOptions[this.distOptions.length - 1].value;
    this.distLow = this.distOptions[0].value;
  }

  priceLowChanged(lowValue: IPriceItem) {
    this.priceLow = lowValue.value;
    console.log(`price ${this.priceLow}, ${this.priceHigh}`);
    this.priceOptionsHigh = this.priceOptions.filter(x => x.value > lowValue.value);
  }

  priceHighChanged(highValue: IPriceItem) {
    this.priceHigh = highValue.value;
    console.log(`price ${this.priceLow}, ${this.priceHigh}`);
    this.priceOptionsLow = this.priceOptions.filter(x => x.value < highValue.value);
  }

  yearLowChanged(lowYear: IYearItem) {
    this.yearLow = lowYear.value;
    console.log(`year ${this.yearLow}, ${this.yearHigh}`);
    this.yearOptionsHigh = this.yearOptions.filter(x => x.value > lowYear.value);
  }
  yearHighChanged(highYear: IYearItem) {
    this.yearHigh = +highYear.value;
    console.log(`year ${this.yearLow}, ${this.yearHigh}`);
    this.yearOptionsLow = this.yearOptions.filter(x => x.value < highYear.value);
  }

  distLowChanged(lowDist: IDistItem) {
    this.distLow = lowDist.value;
    console.log(`dist ${this.distLow}, ${this.distHigh}`);
    this.distOptionsHigh = this.distOptions.filter(x => x.value > lowDist.value);
  }

  distHighChanged(highDist: IDistItem) {
    this.distHigh = +highDist.value;
    console.log(`dist ${this.distLow}, ${this.distHigh}`);
    this.distOptionsLow = this.distOptions.filter(x => x.value < highDist.value);
  }
  ngOnChanges(changes: any) {
    console.log(`Changed = ${changes}`);
  }
  async setMake(make: any) {
    this.currentMake = make.target.value;
    this.currentModel = 'Select a Model';

    this.atService.getMenusForMake(this.currentMake)
      .subscribe((menus: IFieldValues[]) => {
        this.menuModel = menus.filter(x => x.FieldName === 'model')[0].FieldValues;
        console.dir(menus.filter(x => x.FieldName === 'model')[0].FieldValues);
      });
    }

    async setModel(model: any) {
      this.currentModel = model.target.value;
      this.atService.getMenusForModel(this.currentMake, this.currentModel)
        .subscribe((menus: IFieldValues[]) => {
          this.menuModel = menus.filter(x => x.FieldName === 'model')[0].FieldValues;
          console.dir(menus.filter(x => x.FieldName === 'model')[0].FieldValues);
          this.menuRegion = menus.filter(x => x.FieldName === 'location')[0].FieldValues;
          console.dir(menus.filter(x => x.FieldName === 'location')[0].FieldValues);
        });
      }

  async setRegion(region: any) {
    this.currentRegion = region.target.value;
  }
    // this.currentModel = undefined;
    // console.log(`%o`, this.currentMake);
    // const queryParameters = new QueryParameters();
    // queryParameters.make = this.currentMake;
    // queryParameters.region = this.currentRegion;

  doSearch(): void {
    const queryValues: QueryParams = {
      priceLow: this.priceLow,
      priceHigh: this.priceHigh,
      yearLow: this.yearLow,
      yearHigh: this.yearHigh,
      distLow: this.distLow,
      distHigh: this.distHigh,
      make: this.currentMake,
      model: this.currentModel,
      bodyStyle: '',
      region: this.currentRegion,
      tranmissionStyle: ''
    };
    console.log(`%o`, queryValues);
    this.atService.searchVehicles(queryValues)
    .subscribe((response: IResultDto[]) => {
      this.searchResults = response.sort((v1, v2) => v2.discount - v1.discount);
      console.log(`Vehicles = %o`, response);
    });
  }
}
