import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from '../modal/modal.service';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss']
})
export class SongsComponent implements OnInit {

  songList: Object;

  searchText: String;

  playlists: Object;

  selectedSongId: String;

  constructor(private _http: HttpService, private route: ActivatedRoute, private modalService: ModalService) { }

  ngOnInit() {
    if(this.searchText){
      this._http.searchSongs({"keyword": this.searchText}).subscribe(data => {
        this.songList = data;
      });
    } else {
      this._http.getAllSongs().subscribe(data => {
        this.songList = data;
      });
    }
  }


  selectRandom(){
    return `/assets/images/random-${Math.floor(Math.random() * 5) + 1}.png`;
  }

  toggleAccordian(event) {
    if (event.target.classList.contains('expanded')) {
        event.target.previousElementSibling.classList.remove('expanded');
        event.target.previousElementSibling.classList.add('collapsed');

        event.target.classList.remove('expanded');
        event.target.classList.add('collapsed');
    } else if(event.target.classList.contains('collapsed')){
        event.target.previousElementSibling.classList.add('expanded');
        event.target.previousElementSibling.classList.remove('collapsed');

        event.target.classList.add('expanded');
        event.target.classList.remove('collapsed');
    }
  }

  searchWithKeywords(){
    this.ngOnInit();
  }

  populateRating(rating){
    let starCntr = document.getElementById('star-cntr');
    let allStar = starCntr.querySelectorAll('.fa .fa-star-o');
    for(var i = 0; i <= rating; i++){
      allStar[i].classList.add('fa-star');
    }
  }

  getAllPlaylists(){
    this._http.getAllPlaylists().subscribe(data => {
      this.playlists = data;
    });
  }

  addSongToPlaylist(id){
    let req = {
       "song_ids":[this.selectedSongId],
	     "playlistId": id
    }
    this._http.addSongToPlaylist(req).subscribe(data => {
      this.playlists = data;
    });
  }

  openModal(id: string, songId) {
    this.selectedSongId = songId;
    this.getAllPlaylists()
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

}
