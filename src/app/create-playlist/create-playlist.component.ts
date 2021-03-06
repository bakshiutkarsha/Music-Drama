import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ModalService } from '../modal/modal.service';
import { Router } from '@angular/router';
import Utils from '../common/utils';

@Component({
  selector: 'app-create-playlist',
  templateUrl: './create-playlist.component.html',
  styleUrls: ['./create-playlist.component.scss']
})
export class CreatePlaylistComponent implements OnInit {
  title: String;

  description: String;

  songList: Object;

  disabled = true;

  constructor(private _http: HttpService, private modalService: ModalService, private router: Router) { }

  ngOnInit() {
    this.getAllPlaylists();
  }


  createNewPlaylist(){
    this.modalService.open('process-modal');
    let checkboxInp = document.querySelectorAll('input[name=song-id]:checked');
    let radioInp = document.querySelector('input[name="playlist-type"]:checked') as HTMLInputElement;
    let songIDArray = [];
    for(let i = 0; i < checkboxInp.length; i++){
      songIDArray.push(checkboxInp[i].id);
    }

    let title = Utils.sanitizeString(this.title);
    let description = Utils.sanitizeString(this.description);

    let postData = {
      "title": title,
      "song_ids": songIDArray,
      "description": description
    }
    console.log(postData)
    this._http.createPlaylist(postData).subscribe(data => {
      this.modalService.close('process-modal');
      this.router.navigate(['/playlist']);
    });
  }

  checkAllValues(){
    let checks = document.querySelectorAll('input[name=song-id]:checked')
    if(this.title && checks.length > 0){
      this.disabled = false;
    } else {
      this.disabled = true;
    }
  }

  getAllPlaylists(){
    this._http.getAllSongs().subscribe(data => {
      this.songList = data;
    });
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
