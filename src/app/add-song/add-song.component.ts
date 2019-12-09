import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
  styleUrls: ['./add-song.component.scss']
})
export class AddSongComponent implements OnInit {
  title: String;
  artist: String;
  year: Number;
  album: String;
  genre: String;

  constructor(private _http: HttpService) { }

  ngOnInit() {
  }

  addNewSong() {
    let postData = {
      "submitted_by": "utkarsha.bakshi@foo.com",
      "submitted_on": "19-10-2019",
      "song_title": this.title,
      "artist": this.artist,
      "album": this.album,
      "year": this.year,
      "genre": this.genre
    }
    console.log(postData);
    console.log(this)
    this._http.postNewSong(postData).subscribe(data => {

    }, (err) => {

    })
  }

}
