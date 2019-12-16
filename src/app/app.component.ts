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
  isAuthenticated;

  ngOnInit() {
    this.checkForAuthentication();
    this.isAdmin = Utils.isUserAdmin();
    let userDetails = Storage.getCollection('USER_DETAILS');
    if(userDetails && userDetails.username){
      this.currentUserName = userDetails.username;
    } else {
      this.isAuthenticated = false
    }
  }

  checkForAuthentication(){
    let userDetail = Storage.getCollection('USER_DETAILS');
    if(userDetail == undefined){
      Storage.setCollection('USER_DETAILS', {"is_admin":"false", "is_authenticated":"false"});
    } else {
      Storage.setCollection('USER_DETAILS', userDetail);
    }
  }

  changeToUserName(data){
    console.log(data);
  }
}
