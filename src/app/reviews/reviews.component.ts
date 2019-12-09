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

  id: String;

  constructor(private _http: HttpService, private route: ActivatedRoute) { }

  ngOnInit() {
  this.id =  this.route.snapshot.paramMap.get('id');
    this._http.getSongReview(this.id).subscribe(data => {
      this.reviewList = data;
    }, (err) => {
      console.log(err);
    })
  }

}
