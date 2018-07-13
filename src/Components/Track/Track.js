import React from 'react';

class Track extends React.Component {
  constructor (props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  renderAction () {
    if (isRemoval) {
      return '-';
    }else {
      return '+';
    }
  }

  addTrack () {
    this.props.onAdd(this.props.track);
  }

  removeTrack () {
    this.props.onRemove(this.props.track);
  }

  render () {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3><!-- track name will go here --></h3>
          <p><!-- track artist will go here--> | <!-- track album will go here --></p>
        </div>
        <a className="Track-action" onClick={this.props.isRemoval ? this.removeTrack : this.addTrack}>{this.renderAction()}</a>
      </div>
    );
  }
}

export default Track;
