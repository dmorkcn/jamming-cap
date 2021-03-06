import React from 'react';
import './App.css';

import Playlist from '../Playlist/Playlist';
import SearchResults from '../SearchResults/SearchResults';
import SearchBar from '../SearchBar/SearchBar';
import Spotify from '../../util/Spotify';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      searchResults:[],
      playlistName:'',
      playlistTracks:[]
    };
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.search = this.search.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
  }


  search(term){
       Spotify.search(term).then(results => {
       this.setState({searchResults: results})
    });
  }

  updatePlaylistName(name){
    this.setState({playlistName:name});
  }

  addTrack(track){
    if(this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id))
    {
      return;
    }else{
      this.state.playlistTracks.push(track);
      this.setState({playlistTracks:this.state.playlistTracks});
    }
  }
  removeTrack(track){
    if(this.state.playlistTracks.find(removet => removet.id === track.id))
    {
      return this.setState({playlistTracks:this.state.playlistTracks.filter((value)=>{
        return value.id !== track.id;
      })});
    }
  }
  savePlaylist() {
  const trackURIs = this.state.playlistTracks.map(track => track.uri);
  console.log(trackURIs);
  Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {this.setState({ playlistTracks: [] });
  }).then(() => {this.updatePlaylistName('New Playlist'); });
}
  render(){
    return(
      <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
      <SearchBar onSearch={this.search}/>
      <div className="App-playlist">
        <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
        <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave ={this.savePlaylist}/>
    </div>
  </div>
</div>
);

  }
}
export default App;
