import React, { Component } from 'react';

class Player extends Component {

  constructor(props){
    super(props);
    this.state = {
      won: false,
      playing: false
    }
  }

  render(){
    return <div>
      {this.props.name}
      {this.props.isPlaying.toString()}
    </div>

  }
}

export default Player;
