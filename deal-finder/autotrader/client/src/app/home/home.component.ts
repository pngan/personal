import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { AtService } from '../at.service';
import { IFieldValues, IFieldValue } from '../../../../at-shared/dto/at-dto';

export class QueryParameters {
  make: string;
  model: string;
  bodyStyle: string;
  region: string;
  tranmissionStyle: string;
}

interface IPriceItem {
  value: number;
  text: string;
}

interface IYearItem {
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

  public priceLow: IPriceItem;

  public priceHigh: IPriceItem;

  yearOptions: IYearItem[];

  yearOptionsLow: Array<IYearItem>;
  yearOptionsHigh: Array<IYearItem>;
  public yearLow: number;
  public yearHigh: number;
  constructor(private atService: AtService) {
    this.menuMakes = new Array<IFieldValue>();
    this.priceOptions = [
      {
        value: 0,
        text: 'Min'
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
        text: 'Max'
      },
    ];


    this.yearOptions = [
      {
        value: 1900,
        text: 'Any'
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
    this.priceHigh = this.priceOptions[this.priceOptions.length - 1];
    this.priceLow = this.priceOptions[0];

    this.yearOptionsLow = this.yearOptions.slice(0, -1);
    this.yearOptionsHigh = this.yearOptions.slice(1);
    this.yearHigh = this.yearOptions[this.yearOptions.length - 1].value; 
    this.yearLow = this.yearOptions[0].value;
  }
  priceLowChanged(lowValue: IPriceItem) {
    this.priceLow = lowValue;
    console.log(`price ${this.priceLow.value}, ${this.priceHigh.value}`);
    this.priceOptionsHigh = this.priceOptions.filter(x => x.value > lowValue.value);
  }


  priceHighChanged(highValue: IPriceItem) {
    this.priceHigh = highValue;
    console.log(`price ${this.priceLow.value}, ${this.priceHigh.value}`);
    this.priceOptionsLow = this.priceOptions.filter(x => x.value < highValue.value);
  }

  yearLowChanged(lowYear: IYearItem) {
    this.yearLow = lowYear.value;
    console.log(`year ${this.yearLow}, ${this.yearHigh}`);
    this.yearOptionsHigh = this.yearOptions.filter(x => x.value > lowYear.value);
  }


  yearLowChangedXXX(lowYear: HTMLSelectElement) {
    //this.yearLow = lowYear;

    console.log(`low year  %o`, lowYear.value);
    //console.log(`low year  %o`, this.yearLow.value);
    console.log(`low year  ${lowYear.constructor.name}`);
  }

  yearHighChanged(highYear: IYearItem) {
    console.log(`year input ${highYear.value}`);

    this.yearHigh = +highYear.value;
    console.log(`year ${this.yearLow}, ${this.yearHigh}`);
    this.yearOptionsLow = this.yearOptions.filter(x => x.value < highYear.value);
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
    // this.currentModel = undefined;
    // console.log(`%o`, this.currentMake);
    // const queryParameters = new QueryParameters();
    // queryParameters.make = this.currentMake;
    // queryParameters.region = this.currentRegion;

    search(): void {
      console.log('Perform search');
    }



}
