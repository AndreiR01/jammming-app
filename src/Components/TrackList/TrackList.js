import React from 'react';
import Track from '../Track/Track';


class TrackList extends React.Component {

  render() {
    return (
      <div className="TrackList" track="track" >
        {this.props.tracks.map(track => <Track track={track} key={track.id} onAdd={this.props.onAdd} onRemove={this.props.onRemove} />)}
      </div>
    );
  }
}

export default TrackList;
