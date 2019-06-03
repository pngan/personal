import { Component, OnInit, Input } from '@angular/core';
import { IResultDto } from '../../../../at-shared/dto/at-dto';

@Component({
  selector: 'at-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  @Input() searchResults: Array<IResultDto>;
  constructor() { }

  ngOnInit() {
  }

}
