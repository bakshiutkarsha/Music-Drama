import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ModalService } from '../modal/modal.service';
import { Router } from '@angular/router';
import Utils from '../common/utils';



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
  disabled = true;

  constructor(private _http: HttpService, private modalService: ModalService, private router: Router) { }

  ngOnInit() {

  }

  addNewSong() {
    this.modalService.close('add-review');
    this.modalService.open('process-modal');
    let title = Utils.sanitizeString(this.title);
    let artist = Utils.sanitizeString(this.artist);
    let album = Utils.sanitizeString(this.album);
    let year = Utils.sanitizeString(this.year);
    let genre = Utils.sanitizeString(this.genre);

    let postData = {
      "song_title": title,
      "artist": artist,
      "album": album,
      "year": year,
      "genre": genre
    }
    this._http.postNewSong(postData).subscribe(data => {
      if (this.rating) {
        let reviewData = {
          "review_text": this.reviewText,
          "rating": this.rating,
          "song_id": data['_id']
        }
        this._http.postReviewForSong(reviewData).subscribe(reviewData => {
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

  checkAllValues(){
    if(this.title && this.artist && this.year && this.album && this.genre){
      this.disabled = false;
    } else {
      this.disabled = true;
    }
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  addStar(rating) {
    this.rating = rating;
  }

}
