import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service'; // service
import { Router } from '@angular/router'; // router

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  items: any;
  constructor(private _dataService: DataService, private _router: Router) {
    this._dataService.itemObserver.subscribe((items) => {
      this.items = items;
    });
   }
  checkSess(){
    this._dataService.checkSess();
  }

  ngOnInit() {
    this._dataService.showSelected();
  }

}
