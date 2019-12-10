import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'ece9065-ubakshi2-lab5';

  ngOnInit() {
  }

  changeToUserName(data){
    console.log(data);
  }
}
