import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: Object;

  constructor(private _http: HttpService) { }

  ngOnInit() {
    this._http.getAllUsers().subscribe(data => {
      this.users = data;
    });
  }

  updateUserStatus(userId, isActive, type){
    let postData = {};
    if(isActive == 'true'){
        postData[type] = 'false'
      } else {
        postData[type] = 'true'
      }
    this._http.upadetUser(userId,postData).subscribe(data => {

    });
  }

}
