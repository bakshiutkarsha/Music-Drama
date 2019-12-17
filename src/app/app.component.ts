import { Component, OnInit } from '@angular/core';
import Utils from './common/utils';
import Storage from './common/webStorage';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(private _http: HttpService) { }

  title = 'ece9065-ubakshi2-lab5';
  isAdmin;
  currentUserName;
  isAuthenticated;

  ngOnInit() {
    this.lookForCookie()
    this.checkForAuthentication();
    this.isAdmin = Utils.isUserAdmin();
    let userDetails = Storage.getCollection('USER_DETAILS');
    if(userDetails && userDetails.username){
      this.currentUserName = userDetails.username;
      this.isAuthenticated = true;
    } else {
      this.isAuthenticated = false;
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

  lookForCookie(){
    if(document.cookie.indexOf('token') > -1){
      let token = document.cookie.split(";")[0].split('=')[1];
      let username = document.cookie.split(";")[1].split('=')[1]

      this._http.getCurrentUserDetails(token, username).subscribe(data => {
        data['token'] = token;
        Storage.setCollection('USER_DETAILS', data);
        this.deleteAllCookies()
      })
    }
  }

  deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

  changeToUserName(data){
    console.log(data);
  }
}
