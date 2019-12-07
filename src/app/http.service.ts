import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  createHeaderOptions(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRhbmR5MDkiLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTU3NDgzMzQxNX0.zqUf8tjrZpEEnH7fZd30pLoKTa48MO-qWaEbXtqqF2E'
      })
    };
    return httpOptions;
  }

  getAllSongs() {
    return this.http.get('http://localhost:3000/songs/getAllSongs', {
      headers: this.createHeaderOptions().headers
    });
  }

  getSongReview(songId) {
    let url = 'http://localhost:3000/reviews/getReviewForSong/:songId';
    let urlWithId = url.replace(':songId', songId);
    return this.http.get(urlWithId, {
      headers: this.createHeaderOptions().headers
    });
  }
}
