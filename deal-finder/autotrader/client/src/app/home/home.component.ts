import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit() {
  }

}
