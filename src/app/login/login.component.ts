import { Component, OnInit,  EventEmitter, Output } from '@angular/core';
import { HttpService } from '../http.service';
import Storage from '../common/webStorage';
import { ModalService } from '../modal/modal.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: String;

  password: String;

  errorText: String;

  @Output() loginUserHead = new EventEmitter();


  constructor(private _http: HttpService, private modalService: ModalService, private router: Router) { }

  ngOnInit() {
  }

  loginUser(){
    this.modalService.open('process-modal');
    let postData = {
      "username"  : this.email,
      "password"  : this.password
    }
    console.log(postData);
    this._http.authenticateUser(postData).subscribe(data => {
      Storage.setCollection('USER_DETAILS', data);
      this.errorText ="Successfully Logged In!!";
      this.modalService.close('process-modal');
      this.modalService.open('callback-modal');
      this.router.navigate(['/']);

      console.log(data);
    }, (err)=>{
        this.errorText = err.error.message;
        this.modalService.close('process-modal');
        this.modalService.open('callback-modal');
    })
  }
}
