import Storage from './webStorage'

const BASE_URL = 'http://localhost:3000';

const API_URLS =  {
  CREATE_SONG:  ':BASE_URL:/songs/createNewSong',
  UPDATE_SONG:  ':BASE_URL:/songs/updateSong/:songId',
  GET_ALL_SONGS:   ':BASE_URL:/songs/getAllSongs',
  SEARCH_SONG:  ':BASE_URL:/songs/search',

  GET_SONG_REVIEW:   ':BASE_URL:/reviews/getReviewForSong/:songId',
  CREATE_REVIEW:  ':BASE_URL:/reviews/postReviewForsong',
  GET_RECENT_REVIEW: ':BASE_URL:/reviews/getCountAndMostRecentReview/:songId',

  AUTHENTICATE:  ':BASE_URL:/auth/validate',
  GET_ALL_USERS: ':BASE_URL:/auth/getAllUsers',
  REGISTER_USER: ':BASE_URL:/auth/new',
  RESEND_EMAIL:':BASE_URL:/auth/resend/:username',
  UPDATE_USER: ':BASE_URL:/auth/updateUserDeatils/:userId',
  GET_CURRENT_USER: ':BASE_URL:/auth/getUser/:username',


  CREATE_PLAYLIST: ':BASE_URL:/playlist/createNewPlaylist',
  DELETE_SONG_FROM_PLAYLIST: ':BASE_URL:/playlist/deleteFromPlaylist/:playlistId/:songId',
  GET_SONG_FOR_PLAYLIST: ':BASE_URL:/playlist/getSongsForPlaylist/:playlistId:',
  UPDATE_PLAYLIST_SONGS: ':BASE_URL:/playlist/updatePlaylistSong',
  GET_ALL_PLAYLISTS: ':BASE_URL:/playlist/getAllPlaylists',
  GET_FILTERED_PLAYLISTS: ':BASE_URL:/playlist/getFilteredPlaylist/:userId',
  UPDATE_PLAYLIST_FIELDS: ':BASE_URL:/playlist/updatePlaylist/:playlistId',
  DELETE_PLAYLIST: ':BASE_URL:/playlist/deletePlaylist/:playlistId',
}

function getApiUrl() {
  for (var prop in API_URLS) {
    API_URLS[prop] = API_URLS[prop].replace(':BASE_URL:', BASE_URL);
  }
  return API_URLS;
}

export default{
  getApiUrl: getApiUrl
}
