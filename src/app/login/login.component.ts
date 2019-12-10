import { Component, OnInit,  EventEmitter, Output } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: String;

  password: String;

  @Output() loginUserHead = new EventEmitter();


  constructor(private _http: HttpService) { }

  ngOnInit() {
  }

  loginUser(){
    let postData = {
      "username"  : this.email,
      "password"  : this.password
    }
    console.log(postData);
    this._http.authenticateUser(postData).subscribe(data => {
      this.loginUserHead.emit(data);
      console.log(data);
    }, (err)=>{
      this.loginUserHead.emit(err);
    })
  }
}
