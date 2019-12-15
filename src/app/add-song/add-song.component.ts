import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ModalService } from '../modal/modal.service';
import { Router } from '@angular/router';


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
  rating: Number;
  reviewText: String;


  constructor(private _http: HttpService, private modalService: ModalService, private router: Router) { }

  ngOnInit() {
  }

  addNewSong() {
    this.modalService.close('add-review');
    this.modalService.open('process-modal');
    let postData = {
      "song_title": this.title,
      "artist": this.artist,
      "album": this.album,
      "year": this.year,
      "genre": this.genre
    }
    this._http.postNewSong(postData).subscribe(songData => {
      if (this.rating) {
        let reviewData = {
          "review_text": this.reviewText,
          "rating": this.rating,
          "song_id": songData._id
        }
        this._http.postReviewForSong(reviewData).subscribe(data => {
          this.modalService.close('process-modal');
          this.router.navigate(['/songs']);
        }, (err) => {

        })
      } else{
        this.modalService.close('process-modal');
        this.router.navigate(['/songs']);
      }
    }, (err) => {

    })

  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  addStar(rating) {
    this.rating = rating;
  }

}
