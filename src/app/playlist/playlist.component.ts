import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from '../modal/modal.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import Storage from '../common/webStorage';
import Utils from '../common/utils';


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

  adminPlaylist: Object;

  isAdmin: Boolean;

  constructor(private _http: HttpService, private route: ActivatedRoute, private modalService: ModalService) { }

  ngOnInit() {
    this.isAdmin = Utils.isUserAdmin();
    if(this.isAdmin){
      this._http.getAllPlaylists().subscribe(data => {
        this.adminPlaylist = data;
      });
    } else {
      this._http.getFilteredPlaylist().subscribe(data => {
        this.playlists = data;
      });
    }
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
    this.modalService.open('process-modal');
    this._http.deleteSongFromPlaylist(this.currentPlaylistId, songId).subscribe(data => {
      this.modalService.close('process-modal');
      this.ngOnInit();
      this.songsList = null;
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
    this.modalService.close('edit-playlist');
    this.modalService.open('process-modal');
    let radioInp = document.querySelector('input[name="type"]:checked') as HTMLInputElement;
    console.log(radioInp)
    let postData = {
      title: this.editedName,
      description:this.editedDescription,
      is_private: this.playListType
    }

    this._http.updatePlaylistFields(this.currentPlaylistId, postData).subscribe(data => {
      this.modalService.close('process-modal');
      this.ngOnInit();
    });
  }

  deletePlaylist(playlistId, event){
    this.modalService.open('process-modal');
    this._http.deletePlaylist(playlistId).subscribe(data => {
      this.modalService.close('process-modal');
      this.ngOnInit();
    });
    event.stopPropagation();
  }

}
