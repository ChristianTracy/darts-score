import React, { Component } from 'react';
import Turn from './Turn';
import './player.css';

class Player extends Component {

  componentWillReceiveProps(newProps){
    if (newProps !== this.props) {
      this.setState({
        turns:newProps.turns
      })
    }
  }

  render(){
    let turns;
    if(this.props.turns.length === 0){
      turns = [
        <Turn key={0}
          darts={this.props.turns}
          throwDart={this.props.throwDart}
          isPlaying={this.props.isPlaying}
          winner={this.props.winner}/>
      ];
    }
    else{
      turns = this.props.turns.map((turn, idx) => {
        return <Turn key={idx}
        darts={turn}
        throwDart={this.props.throwDart}
        isPlaying={this.props.isPlaying}
        winner={this.props.winner}/>;
      });
    }

    return <div className="player">
      <header>{this.props.name}</header>
      <div className="scores-table">{turns}</div>
    </div>

  }
}

export default Player;
