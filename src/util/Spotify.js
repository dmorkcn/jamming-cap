let accessToken;
let expiresIn;
const clientId = 'e499d8571e744374912f86677b23a83c';
const redirectURI = 'http://localhost:3000/';
const url = 'https://accounts.spotify.com/authorize?';
const spotifyUrl = `${url}client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}&state=1889`;


const Spotify = {
getAccessToken(){

    if(accessToken){
      return accessToken;
    }
    else{
      console.log('Access token not recieved');
      let tokenCheck = window.location.href.match(/access_token=([^&]*)/);
      let expTimeCheck = window.location.href.match(/expires_in=([^&]*)/);

      if(tokenCheck && expTimeCheck){
        console.log('User access granted, get access token from url.');
        accessToken = tokenCheck[1];
        expiresIn = Number(expTimeCheck[1]);
        window.setTimeout(() => accessToken = '', expiresIn * 1000);
        window.history.pushState('Access Token', null, '/');
        return accessToken;
      }
      else{
        console.log('User login required.');
        let site = spotifyUrl;
        window.location = site;
      }
    }
},
search(term) {
  const accessToken = this.getAccessToken();
     return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
       headers: {
         Authorization: `Bearer ${accessToken}`
       }
     }).then(response => {
       return response.json();
     }).then(jsonResponse => {
       console.log('GET request Access Token success');
       if (!jsonResponse.tracks) {
         return [];
       }
       return jsonResponse.tracks.items.map(track => ({
         id: track.id,
         name: track.name,
         artist: track.artists[0].name,
         album: track.album.name,
         image:track.album.images,
         uri: track.uri
       }));
     }
   );
 },
 savePlaylist(name,trackURIs){
   if(!(name || trackURIs)){
      return;
    }
   const accessToken = Spotify.getAccessToken();
   const headers =  { Authorization: `Bearer ${accessToken}`};
    return fetch('https://api.spotify.com/v1/me', {headers: headers
      }).then(response => {
        return response.json();
      }).then(jsonResponse => {
        // Retrieved the user ID through a GET request
          let userID = jsonResponse.id;
//Using user ID to create new playlist in the user account
        return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`,
          {
            method:"POST",
            body:JSON.stringify({name:name}),
            headers:headers
          })}).then(response => {
            return response.json();
          }).then(jsonResponse => {
// Retrieved the playlist ID through a GET request for created playlist.
            let playlistID = jsonResponse.id;
//Adding tracks and saveing the new playlist the user account.
            return fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`,
               {
                method:"POST",
                body:JSON.stringify({uris:trackURIs}),
                headers:headers
              })});
}
};
export default Spotify;
