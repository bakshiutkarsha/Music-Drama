import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  reviewList: Object;

  constructor(private _http: HttpService, private route: ActivatedRoute) { }

  ngOnInit() {
    let songIdFromParams = this.route.params.id;
    this._http.getSongReview(songIdFromParams).subscribe(data => {
      this.reviewList = data;
    }, (err) => {
      console.log(err);
    })
  }

}
