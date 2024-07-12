let accessToken='';
const clientID='ff99a218ab99419db4f41b827febc6a0'
const redirectUrl="http://localhost:3000"
const scope='playlist-modify-public playlist-modify-private'
let Spotify = {
    getAccessToken(){
      if (accessToken){
        return accessToken
      }
      const tokenInURL=window.location.href.match(/access_token=([^&]*)/);
      const expiryTime=window.location.href.match(/expires_in=([^&]*)/);
      if (tokenInURL && expiryTime){
        //setting access token and expiry time variables
        accessToken=tokenInURL[1];
        const expiresIn=Number(expiryTime[1]);
        //setting the access token to expire at the value expiration time
        window.setTimeout(()=>(accessToken=''), expiresIn*1000);
        //clearing the url after the access token expires
        window.history.pushState('Access token', null, '/');
        return accessToken
      }
      //Third check for the access token if the first and the second check are both false
      const redirect = `https://accounts.spotify.com/authorize?client_id=${encodeURIComponent(clientID)}&response_type=token&scope=${encodeURIComponent('playlist-modify-public playlist-modify-private')}&redirect_uri=${encodeURIComponent(redirectUrl)}`;
      window.location = redirect;
    },
    search (term){
      accessToken=Spotify.getAccessToken();
      console.log(accessToken)
      return fetch(`https://api.spotify.com/v1/search?q=${term}&type=track`,{
        method:'GET',
        headers:{
          Authorization: `Bearer ${accessToken}`
        }
      }
      ).then(response => {
        if(response.ok){
          return response.json()
        }
        console.log(response)
        throw new Error(`Request failed with ${response.status}`)
      }, networkError => {
        console.log(networkError.message)
      }).then(jsonReponse => {
        if(!jsonReponse){
          console.error('Response error')
        }
        return jsonReponse.tracks.items.map(item=>(
          {
            id:item.id,
            uri:item.uri,
            name:item.name,
            album:item.album.name,
            artist:item.artists[0].name
          }
        ))
      })
    },
    savePlaylist(playlistName, trackUris) {
      if (!playlistName || !trackUris) {
          return 
      }
      const accessToken = Spotify.getAccessToken();
      const header = { Authorization: `Bearer ${accessToken}` };
      let userID = '';
      console.log(accessToken)
      return fetch(`https://api.spotify.com/v1/me`, {
          method: 'GET',
          headers: header
      }).then(response => {
          if (response.ok) {
              return response.json();
          }
          console.log(response);
          throw new Error(`Request failed with ${response.status}`);
      }).then(jsonResponse => {
          if (!jsonResponse) {
              console.error('Response error');
              return;
          }
          userID = jsonResponse.id;
          console.log(userID)
          console.log(jsonResponse.scope)
          let playlistId=''
          return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
              method: 'POST',
              headers: header,
              body: JSON.stringify({ name: String(playlistName) })
          }).then(response => {
            if (response.ok) {
              return response.json()
            }

          }).then(jsonResponse => {
            if (!jsonResponse) {
              console.error('Response error');
              return;
            }
            playlistId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
              method: 'POST',
              headers: header,
              body: JSON.stringify({
                  uris: trackUris,
                  position: 0
              })
            }).then(response => {
              if (response.ok) {
                return response.json();
              }
              console.log(response);
              throw new Error(`Request failed with ${response.status}`);
            }).catch(networkError => {
              console.log(networkError.message);
            });
          })
        })
    }
}
export default Spotify

