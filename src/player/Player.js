import React, { Component } from 'react';
import Turn from './Turn';
import './player.css';

class Player extends Component {

  constructor(props){
    super(props);
    this.state = {
      won: false,
      playing: false
    }
  }

  componentWillReceiveProps(newProps){
    this.forceUpdate()
  }

  render(){
    let turns;
    if(this.props.turns.length === 0){
      turns = [
        <Turn key={0} darts={this.props.turns} throwDart={this.props.throwDart}/>
      ];
    }
    else{
      turns = this.props.turns.map((turn, idx) => {
        return <Turn key={idx} darts={turn} throwDart={this.props.throwDart}/>;
      });
    }

    return <div className="player">
      <header>{this.props.name}</header>
      <div>{turns}</div>
    </div>

  }
}

export default Player;
