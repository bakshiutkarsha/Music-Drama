import { Component, OnInit } from '@angular/core';
import Utils from './common/utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'ece9065-ubakshi2-lab5';
  isAdmin;

  ngOnInit() {
    this.isAdmin = Utils.isUserAdmin();
  }

  changeToUserName(data){
    console.log(data);
  }
}
