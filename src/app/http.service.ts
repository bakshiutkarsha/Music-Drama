import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import URL from './common/url';
import Storage from './common/webStorage';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  currentUser;

  constructor(private http: HttpClient) {
      console.log(this.currentUser);
      this.currentUser = Storage.getCollection('USER_DETAILS');

  }


  createHeaderOptions(){
    const token = Storage.getCollection('USER_DETAILS').token;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
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

  deleteMethod(url){
    return this.http.delete(url, {
      headers: this.createHeaderOptions().headers
    });
  }

  patchMethod(url, data){
    return this.http.patch(url, data, {
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
    postData.submitted_by = this.currentUser.userId;
    return this.postMethod(URL.getApiUrl().CREATE_PLAYLIST, postData);
  }

  getSongsForPlaylist(playlistId){
    return this.getMethod(URL.getApiUrl().GET_SONG_FOR_PLAYLIST.replace(':playlistId:', playlistId));
  }

  addSongToPlaylist(postData){
    return this.postMethod(URL.getApiUrl().UPDATE_PLAYLIST_SONGS, postData);
  }

  deleteSongFromPlaylist(playlistId, songId){
    return this.deleteMethod(URL.getApiUrl().DELETE_SONG_FROM_PLAYLIST.replace(':playlistId', playlistId).replace(':songId', songId));
  }

  getFilteredPlaylist(){
    return this.getMethod(URL.getApiUrl().GET_FILTERED_PLAYLISTS.replace(':userId', this.currentUser.userId));
  }

  updatePlaylistFields(playlistId, postData){
    return this.patchMethod(URL.getApiUrl().UPDATE_PLAYLIST_FIELDS.replace(':playlistId', playlistId), postData);
  }

}
