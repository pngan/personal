import { Component, OnInit, Input } from '@angular/core';
import { IResultDto } from '../../../../at-shared/dto/at-dto';

@Component({
  selector: 'at-result-item',
  templateUrl: './result-item.component.html',
  styleUrls: ['./result-item.component.css']
})
export class ResultItemComponent implements OnInit {

  @Input() result: IResultDto;

  direction: string;
  absolutePercentage: number;
  constructor() { }

  ngOnInit() {
    if (this.result !== undefined) {
      this.direction = this.result.discount < 0 ? 'premium' : 'discount';
      this.absolutePercentage = this.result.discount < 0 ? -this.result.discount : this.result.discount;
    }
  }

}
