const BASE_URL = 'http://localhost:3000'

const API_URLS =  {
  GET_ALL_SONGS:   ':BASE_URL:/songs/getAllSongs',
  SEARCH_SONG:  ':BASE_URL:/songs/createNewSong',
  CREATE_SONG:  ':BASE_URL:/songs/search',

  GET_SONG_REVIEW:   ':BASE_URL:/reviews/getReviewForSong/:songId',
  CREATE_REVIEW:  ':BASE_URL:/reviews/postReviewForsong',

  AUTHENTICATE:  ':BASE_URL:/auth/validate',

  CREATE_PLAYLIST: ':BASE_URL:/playlist/createNewPlaylist',
  DELETE_SONG_FROM_PLAYLIST: ':BASE_URL:/playlist/deleteFromPlaylist/:playlistId/:songId',
  GET_SONG_FOR_PLAYLIST: ':BASE_URL:/playlist/getSongsForPlaylist/:playlistId',
  UPDATE_PLAYLIST_SONGS: ':BASE_URL:/playlist/updatePlaylistSong',
  GET_ALL_PLAYLISTS: ':BASE_URL:/playlist/getAllPlaylists'
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
