import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { ActivatedRoute, Router } from '@angular/router';
import "Rxjs";
import { BehaviorSubject } from 'Rxjs';

@Injectable()
export class DataService {
  user: object;
  userObserver = new BehaviorSubject(this.user);
  items: Array<object> = [];
  itemObserver = new BehaviorSubject(this.items);


  constructor(private _http: Http, private _router: Router) { }

  login(user, cb){
    this._http.post("/login", user).subscribe(res => {
      this.user = res.json();
      this.userObserver.next(this.user);
      cb(res.json())
    })
  }

  checkSess(){
    this._http.get("/sess").subscribe((res) => { 
      if (!res.json()){
        this._router.navigate(["/"]);
      }
      else{
        this.user = res.json();
        this.showAll();
        this.userObserver.next(this.user);
      }
    })
  }

  addItem(item){
    this.checkSess();
    this._http.post("/addItem", item).subscribe(res => {
      this.items = res.json();
      this.itemObserver.next(this.items);
    })
  }

  check(data){
    this._http.post("/check", data).subscribe(res => {
    });
  }

  showAll(){
    this._http.get("/showAll").subscribe(res => {
      this.items = res.json();
      this.itemObserver.next(this.items);
    });
  }

  showSelected(){
    this._http.get("/showSelected").subscribe(res => {
      console.log(res.json())
      this.items = res.json();
      this.itemObserver.next(this.items);
    });
  }

  getUsers(cb){
    this._http.get("/getUsers").subscribe(res => {
      cb(res.json());
    });
  }
  
}