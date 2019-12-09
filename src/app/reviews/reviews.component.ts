import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from '../modal/modal.service';


@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  reviewList: Object;

  id: String;

  rating: Number;

  reviewText: String;
  constructor(private _http: HttpService, private route: ActivatedRoute, private modalService: ModalService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this);
    this._http.getSongReview(this.id).subscribe(data => {
      this.reviewList = data;
    }, (err) => {
      console.log(err);
    })
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  addStar(rating){
    this.rating = rating;
  }

  addNewReview(){
    let postData = {
      "submitted_by"  : "utkarsha bakshi-5",
      "submitted_on"  :"23-10-2019",
      "review_text"   : this.reviewText,
      "rating"        : this.rating,
      "song_id"       : this.id
    }
    console.log(postData);
    this._http.postReviewForSong(postData).subscribe(data => {

    }, (err)=>{

    })
  }

}
