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

  constructor(private _http: HttpService, private modalService: ModalService) { }

  ngOnInit() {
    this._http.getAllPlaylists().subscribe(data => {
      this.playlists = data;
    });
  }

}
