import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service'; // service
import { Router } from '@angular/router'; // router

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: object;

  constructor(private _dataService: DataService, private _router: Router) {
    this.user = {name: ""}
   }

   onSubmit(){
     this._dataService.login(this.user, (res) => {
       if(res){
         this._router.navigate(["dashboard"])
       }
       else{
         this._router.navigate([""])
       }
     })
     
   }

  ngOnInit() {
  }

}
