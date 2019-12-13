import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ModalService } from '../modal/modal.service';


@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {

  playlists: Object;

  songsList: Object;

  playListName: String;

  randomColor: 'red';

  constructor(private _http: HttpService, private modalService: ModalService) { }

  ngOnInit() {
    this._http.getAllPlaylists().subscribe(data => {
      this.playlists = data;
    });
  }

  getSongsFromPlaylist(id, title){
    this._http.getSongsForPlaylist(id).subscribe(data => {
      this.songsList = data;
      this.playListName = title;
      // this.songsList = Array.of(this.songsList);
      console.log(this.songsList)
    });
  }

}
