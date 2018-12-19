import { Component, OnInit } from '@angular/core';
import { AtService } from '../at.service';
import { IFieldValues, IFieldValue } from '../../../../at-shared/dto/at-dto';

export class QueryParameters {
  make: string;
  model: string;
  bodyStyle: string;
  region: string;
  tranmissionStyle: string;
}
@Component({
  selector: 'at-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

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

  priceOptions: Array<Number>;
  priceOptionsLow: Array<Number>;
  priceOptionsHigh: Array<Number>;

  constructor(private atService: AtService) {
    this.menuMakes = new Array<IFieldValue>();
    this.priceOptions = [2500, 5000, 7500, 10000, 12000, 15000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000];
    this.priceOptionsLow = this.priceOptions.filter(x => x);
    this.priceOptionsHigh = this.priceOptions.filter(x => x);
   }

  ngOnInit() {
    this.atService.getMakes().subscribe((makes: IFieldValues[]) => {
      this.menuMakes = makes[0].FieldValues;
      console.dir(makes[0].FieldValues);
    });
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
}
