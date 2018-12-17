import { Component, OnInit } from '@angular/core';
import { AtService } from '../at.service';
import { IFieldValues, IFieldValue } from '../../../../at-shared/dto/at-dto';

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

}
