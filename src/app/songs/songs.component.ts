import { Component, OnInit } from '@angular/core';
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
  }

}
