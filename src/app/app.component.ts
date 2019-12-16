import { Component, OnInit } from '@angular/core';
import Utils from './common/utils';
import Storage from './common/webStorage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'ece9065-ubakshi2-lab5';
  isAdmin;
  currentUserName;

  ngOnInit() {
    this.isAdmin = Utils.isUserAdmin();
    let userDetails = Storage.getCollection('USER_DETAILS');
    if(userDetails){
      this.currentUserName = userDetails.username;
    }
  }

  changeToUserName(data){
    console.log(data);
  }
}
