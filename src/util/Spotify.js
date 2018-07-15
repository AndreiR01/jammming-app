const clientID = 'ffb0a28855194d07980b62449efba90e';
const redirectURI = "http://localhost:3000/";
let accessToken;


const Spotify = {

  getAccessToken () {

    if (accessToken) {
      return accessToken;
    };

    accessToken = window.location.href.match(/access_token=([^&]*)/);
    const expiresIn = window.location.href.match(/expires_in=([^&]*)/);

    if (accessToken && expiresIn) {
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    }else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
    };
  },

  search (term) {
    const accessToken = Spotify.getAccessToken();
    console.log(accessToken);
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,{
      headers: {Authorization: `Bearer ${accessToken}`}
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if(!jsonResponse.tracks) {
        return [];
      };
        return jsonResponse.tracks.items.map( track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        }))
    });
  },





  savePlaylist(playlistName, trackUris) {
      if(!playlistName || !trackUris.length) {
        return;
      }

      const access_token = Spotify.getAccessToken();

      let headers = {
        header:{Authorization:  `Bearer ${access_token}`}
      }

      let user_id;
      //FETCH GET
      return fetch (`https://api.spotify.com/v1/me`, {
        headers: headers
      }).then(response => {
        if(response.ok){
          return response.json();
        }
      }).then(jsonResponse => {
         user_id = jsonResponse.id;
         let playlistID;
         return fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`,{
           headers: headers,
           method:'POST',
           body:JSON.stringify( {
             name: playlistName
           })
         }).then(response => {
           return response.json();
         }).then(jsonResponse => {
           playlistID = jsonResponse.id;
           return fetch(`https://api.spotify.com/v1/users/{user_id}/playlists/${playlistID}/tracks`, {
             headers: headers,
             method:'POST',
             body:JSON.stringify({
               uris:trackUris,
             })
           });
         });
      });


      //FETCH POST to create a Playlsit
          //fetch POST that adds tracks to a playlsit
  }
}


export default Spotify;
