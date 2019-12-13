import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import URL from './common/url';


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

  getMethod(url){
    return this.http.get(url, {
      headers: this.createHeaderOptions().headers
    });
  }

  postMethod(url, data){
    return this.http.post(url, data, {
      headers: this.createHeaderOptions().headers
    });
  }


// SONGS PAGE API's
  getAllSongs(){
    return this.getMethod(URL.getApiUrl().GET_ALL_SONGS);
  }

  postNewSong(postData){
    return this.postMethod(URL.getApiUrl().CREATE_SONG, postData);
  }

  searchSongs(searchData){
    return this.postMethod(URL.getApiUrl().SEARCH_SONG, searchData);
  }

// REVIEW PAGE API's

  getSongReviews(songId) {
    return this.getMethod(URL.getApiUrl().GET_SONG_REVIEW.replace(':songId', songId));
  }

  postReviewForSong(postData){
    return this.postMethod(URL.getApiUrl().CREATE_REVIEW, postData);
  }

// AUTHENTICATE
  authenticateUser(postData){
    return this.postMethod(URL.getApiUrl().AUTHENTICATE, postData);
  }

//  PLAYLIST API's

  getAllPlaylists(){
    return this.getMethod(URL.getApiUrl().GET_ALL_PLAYLISTS);
  }

  createPlaylist(postData){
    return this.postMethod(URL.getApiUrl().CREATE_PLAYLIST, postData);
  }

  getSongsForPlaylist(playlistId){
    return this.getMethod(URL.getApiUrl().GET_SONG_FOR_PLAYLIST.replace(':playlistId:', playlistId));
  }

  addSongToPlaylist(postData){
    return this.postMethod(URL.getApiUrl().UPDATE_PLAYLIST_SONGS, postData);
  }

}
