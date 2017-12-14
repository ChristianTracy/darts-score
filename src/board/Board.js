import React from 'react';
import PropTypes from 'prop-types';
import Player from '../player/Player';
import Score from './Score';
import firebaseConnection from '../utils/firebaseConnection';

import './board.css';

class Board extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      currentPlayer: 0,
      round: 0
    };

    this.isPlaying = this.isPlaying.bind(this);
  }

  saveData = () => {
    firebaseConnection.database().ref('/players').set(this.state.players)
  }

  componentWillMount(){
    if(this.props.players){
      let players = this.props.players.map((playerName) => {
        return {
          name: playerName,
          turns: []
        };
      });

      this.setState({
        players
      });
    }
  }

  isPlaying(idx){
    return idx === this.state.currentPlayer;
  }


  throwDart = (score) => {
    let currentPlayer = this.state.players[this.state.currentPlayer];
    let currentTurn = currentPlayer.turns[currentPlayer.turns.length - 1];
    console.log(currentTurn);

    if(currentTurn === undefined){
      currentPlayer.turns.push([score])
    }else if(currentTurn.length < 3){
      currentTurn.push(score)
    }

  }

  render(){
    let players;
    if (this.props.players) {
      players = this.state.players.map((player, idx) => {
        return <Player key={idx}
          name={player.name}
          turns={player.turns}
          isPlaying={this.isPlaying(idx)}
          throwDart={this.throwDart} />
      })
    }
    return <div className="board">
      <div className="body">
        {players}
      </div>
      <div className="totals">
        <Score scores={[1,2]}/>
      </div>
      <button onClick={this.saveData}>Save Data</button>
    </div>
  }
}

Board.propTypes = {
  players: PropTypes.array
};

export default Board;
