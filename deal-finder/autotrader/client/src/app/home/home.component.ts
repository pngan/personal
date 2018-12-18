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
  regionMenu: IFieldValue[];
  currentRegion: string;
  menuMakes: IFieldValue[];

  constructor(private atService: AtService) {
    this.menuMakes = new Array<IFieldValue>();
   }

  ngOnInit() {
    this.atService.getMakes().subscribe((makes: IFieldValues[]) => {
      this.menuMakes = makes[0].FieldValues;
      console.dir(makes[0].FieldValues);
    });
  }
  async setMake(make: any) {
    this.currentMake = make.target.value;

    this.atService.getMenusForMake(this.currentMake)
      .subscribe((menus: IFieldValues[]) => {
        this.menuModel = menus.filter(x => x.FieldName === 'model')[0].FieldValues;
        console.dir(menus.filter(x => x.FieldName === 'model')[0].FieldValues);
      });
    }

    // this.currentModel = undefined;
    // console.log(`%o`, this.currentMake);
    // const queryParameters = new QueryParameters();
    // queryParameters.make = this.currentMake;
    // queryParameters.region = this.currentRegion;
}
