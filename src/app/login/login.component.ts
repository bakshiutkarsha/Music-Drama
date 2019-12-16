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

  disabled = true;

  emailErrorText = false;

  showResendButton = false;

  @Output() loginUserHead = new EventEmitter();


  constructor(private _http: HttpService, private modalService: ModalService, private router: Router) { }

  ngOnInit() {
  }

  registerUser(){
    this.modalService.open('process-modal');
    let postData = {
      "username"  : this.email,
      "password"  : this.password
    }
    this._http.registerUser(postData).subscribe(data => {
      this.errorText = "Please Check your email to verify your account!!";
      this.modalService.close('process-modal');
      this.modalService.open('callback-modal');
      console.log(data);
    }, (err)=>{
      this.errorText = err.error;
      this.modalService.close('process-modal');
      this.modalService.open('callback-modal');
    })
  }

  loginUser(){
    this.modalService.open('process-modal');
    let postData = {
      "username"  : this.email,
      "password"  : this.password
    }
    console.log(postData);
    this._http.authenticateUser(postData).subscribe(data => {
      data['is_authenticated'] = 'true';
      Storage.setCollection('USER_DETAILS', data);
      this.errorText ="Successfully Logged In!!";
      this.modalService.close('process-modal');
      this.modalService.open('callback-modal');
      this.router.navigate(['/songs']);

      console.log(data);
    }, (err)=>{
        if(err.status === 500){
          this.showResendButton =  true;
        }
        Storage.setCollection('USER_DETAILS', {'is_authenticated':'false', 'is_admin': 'false'})
        this.errorText = err.error.message;
        this.modalService.close('process-modal');
        this.modalService.open('callback-modal');
    })
  }

  validateEmailRegex() {
    let email = this.email;
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  validateEmail(){
    if(!this.validateEmailRegex() && this.email != 'site manager'){
      this.emailErrorText = true;
    } else{
      this.emailErrorText = false;
    }
  }

  resendEmail(){
    this.modalService.open('process-modal');
      this._http.resendEmail(this.email).subscribe(data => {
        // this.errorText = "Please Check your email to verify your account!!";
        this.modalService.close('process-modal');
        this.modalService.close('callback-modal');
        // this.modalService.open('callback-modal');
        console.log(data);
      }, (err)=>{
        console.log(err);
        this.errorText = err;
        this.modalService.close('process-modal');
        this.modalService.open('callback-modal');
      })
    }

  checkAllValues(){
    if(this.email && this.password && !this.emailErrorText){
      this.disabled = false;
    } else {
      this.disabled = true;
    }
  }
}
