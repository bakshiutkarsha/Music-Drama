import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss']
})
export class SongsComponent implements OnInit {

  songList: Object;

  constructor(private _http: HttpService) { }

  ngOnInit() {
    console.log('here');
    this._http.getAllSongs().subscribe(data => {
      this.songList = data;
    });
    //this.populateRating(4);
  }


  selectRandom(){
    return `/assets/images/random-${Math.floor(Math.random() * 5) + 1}.png`;
  }

  toggleAccordian(event) {
    if (event.target.classList.contains('expanded')) {
        event.target.nextElementSibling.classList.remove('expanded');
        event.target.nextElementSibling.classList.add('collapsed');

        event.target.classList.remove('expanded');
        event.target.classList.add('collapsed');
    } else if(event.target.classList.contains('collapsed')){
        event.target.nextElementSibling.classList.add('expanded');
        event.target.nextElementSibling.classList.remove('collapsed');

        event.target.classList.add('expanded');
        event.target.classList.remove('collapsed');
    }
  }


  // @ViewChild('starRef') starRef: ElementRef;
  // ngAfterViewInit() {
  //   console.log(this);
  // }

  populateRating(rating){
    let starCntr = document.getElementById('star-cntr');
    let allStar = starCntr.querySelectorAll('.fa .fa-star-o');
    console.log(allStar);
    for(var i = 0; i <= rating; i++){
      allStar[i].classList.add('fa-star');
    }
  }
  // resetState(){
  //
  // }
}
