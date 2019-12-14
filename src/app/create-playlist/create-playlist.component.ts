import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-create-playlist',
  templateUrl: './create-playlist.component.html',
  styleUrls: ['./create-playlist.component.scss']
})
export class CreatePlaylistComponent implements OnInit {
  title: String;

  description: String;

  songList: Object;

  constructor(private _http: HttpService) { }

  ngOnInit() {
    this.getAllPlaylists();
  }

  createNewPlaylist(){
    let checkboxInp = document.querySelectorAll('input[name=song-id]:checked');
    let radioInp = document.querySelector('input[name="playlist-type"]:checked');
    let songIDArray = [];
    for(let i = 0; i < checkboxInp.length; i++){
      songIDArray.push(checkboxInp[i].id);
    }

    let postData = {
      "title": this.title,
      "song_ids": songIDArray,
      "description": this.description,
      "submitted_by": "utkarsha",
      "is_private": radioInp.value
    }
    console.log(postData)
    this._http.createPlaylist(postData).subscribe(data => {
      console.log(data);
    });
  }

  getAllPlaylists(){
    this._http.getAllSongs().subscribe(data => {
      this.songList = data;
    });
  }

}
