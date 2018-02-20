import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service'; // service
import { Router } from '@angular/router'; // router
import { Item } from "../item" // class
import { User } from "../user" // class

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: any = new User();
  item: Item = new Item();
  items: Array<object> = [];
  users: Array<object> = [];
  myCheck: object = {checkId: ""};

  constructor(private _dataService: DataService, private _router: Router) {
    this._dataService.userObserver.subscribe((user) => {
      this.user = user;
    });
    this._dataService.itemObserver.subscribe((items) => {
      this.items = items;
    })
   }
  checkSess(){
    this._dataService.checkSess();
  }

  addItem(item) {
    this.item.userId = this.user._id;
    this.item.creator = this.user.name;
    this._dataService.addItem(this.item);
  }

  getUsers(){
    this._dataService.getUsers(res => {
      this.users = res;
    })
  }

  check(data){
    this.myCheck['checkId'] = data
    console.log(this.myCheck)
    this._dataService.check(this.myCheck);
  }

  ngOnInit() {
    this.checkSess();
    this.getUsers();
  }

}
