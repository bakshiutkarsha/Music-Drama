import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute } from '@angular/router';
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

  currentPlaylistId: String;

  playListDescription: String;

  constructor(private _http: HttpService, private route: ActivatedRoute, private modalService: ModalService) { }

  ngOnInit() {
    this._http.getAllPlaylists().subscribe(data => {
      this.playlists = data;
    });
  }

  getSongsFromPlaylist(id, title, description){
    this._http.getSongsForPlaylist(id).subscribe(data => {
      this.songsList = data;
      this.playListName = title;
      this.currentPlaylistId = id;
      this.playListDescription = description;
      console.log(this.songsList)
    });
  }

  deleteSongFromPlaylist(songId){
    this._http.deleteSongFromPlaylist(this.currentPlaylistId, songId).subscribe(data => {
      console.log(data);
    });
  }

  openPlaylistEditModal(id: string, event, playlistId, playListName, playListDescription){
    this.playListName = playListName;
    this.playListDescription = playListDescription;
    this.modalService.open(id);
    event.stopPropagation();
  }

}
