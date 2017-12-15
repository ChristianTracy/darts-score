import React, { Component } from 'react';
import Turn from './Turn';
import './player.css';

class Player extends Component {

  constructor(props){
    super(props);
    this.state = {
      won: false,
      playing: false,
      turns: this.props.turns
    }
  }

  componentWillReceiveProps(newProps){
    if (newProps !== this.props) {
      this.setState({
        turns:newProps.turns
      })
    }
  }

  render(){
    let turns;
    if(this.state.turns.length === 0){
      turns = [
        <Turn key={0} darts={this.state.turns} throwDart={this.props.throwDart}/>
      ];
    }
    else{
      turns = this.state.turns.map((turn, idx) => {
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
