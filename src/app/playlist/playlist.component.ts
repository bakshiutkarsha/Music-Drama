import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from '../modal/modal.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import Storage from '../common/webStorage';


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

  playListType: String;

  editedName: String;

  editedDescription: String;

  constructor(private _http: HttpService, private route: ActivatedRoute, private modalService: ModalService) { }

  ngOnInit() {
    this._http.getFilteredPlaylist().subscribe(data => {
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

  openPlaylistEditModal(id: string, event, playlistId, playListName, playListDescription, playListType){
    this.playListName = playListName;
    this.playListDescription = playListDescription;
    this.currentPlaylistId = playlistId;
    this.playListType = playListType;
    console.log(this.playListType);
    this.modalService.open(id);
    event.stopPropagation();
  }

  editPlaylist(){
    let radioInp = document.querySelector('input[name="type"]:checked') as HTMLInputElement;
    console.log(radioInp)
    let postData = {
      title: this.editedName,
      description:this.editedDescription,
      is_private: radioInp.value
    }

    this._http.updatePlaylistFields(this.currentPlaylistId, postData).subscribe(data => {
      console.log(data);
    });
  }

}
