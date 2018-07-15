import React from 'react';
import './App.css';

import Playlist from '../Playlist/Playlist';
import SearchResults from '../SearchResults/SearchResults';
import SearchBar from '../SearchBar/SearchBar';
import Spotify from '../../util/Spotify';

class App extends React.Component {

  constructor (props) {
    super(props);
    this.state =  {
      searchResults: [],
      playlistName:'Flying Cars',
      playlistTracks: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack (track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
        return;
      }
    let tracks = this.state.playlistTracks;
    tracks.push(track);
    this.setState(tracks =>
      tracks.push(playlistTracks)
    );
  }

  removeTrack (track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
        return;
      }
  }

  updatePlaylistName (name) {
    this.setState({playlistName:name});
  }

  savePlaylist () {
    const trackUris = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() =>
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      })
    )
  }

  search(term) {
    Spotify.search(term).then(tracks =>
        this.setState({searchResults: tracks}));
 }

  render() {
    return (
      <div className="main-div">
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
            <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack()}/>
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack()} onSave={this.savePlaylist}
            onNameChange={this.updatePlaylistName} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
