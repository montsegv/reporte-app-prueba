import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  myReports:any[] = [];

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.myReports.push(1,2,3);
    }, 2500);
  }

}
