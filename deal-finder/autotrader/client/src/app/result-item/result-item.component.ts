import { Component, OnInit, Input } from '@angular/core';
import { IResultDto } from '../../../../at-shared/dto/at-dto';

@Component({
  selector: 'at-result-item',
  templateUrl: './result-item.component.html',
  styleUrls: ['./result-item.component.css']
})
export class ResultItemComponent implements OnInit {

  @Input() result: IResultDto;
  constructor() { }

  ngOnInit() {
  }

}
