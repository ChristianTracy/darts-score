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

  }

  saveData = () => {
    firebaseConnection.database().ref('/players').set(this.state.players)
  }

  componentWillMount(){
    if(this.props.players){
      let players = this.props.players.map((playerName, idx) => {
        return {
          name: playerName,
          turns: []
        };
      });

      let scores = Array(players.length).fill(0);

      this.setState({
        players,
        scores
      });
    }
  }

  isPlaying = idx => {
    return idx === this.state.currentPlayer;
  }

  updateTurn = () => {
    //update current player
      let currentPlayer = this.state.currentPlayer + 1;
      let round = this.state.round;
      if(currentPlayer > this.state.players.length - 1){
        currentPlayer = 0;
        round =  + 1;
      }

      let player = this.state.players[currentPlayer];
      player.turns = [...player.turns, []];

      this.setState({
        players: [
          ...this.state.players.slice(0, currentPlayer),
          player,
          ...this.state.players.slice(currentPlayer + 1)
        ],
        currentPlayer,
        round
      })    
  }

  validateTurn = () => {
    //check if the turn shoul be change to another player
    let currentPlayer = this.state.players[this.state.currentPlayer];
    let dartsThrown = currentPlayer.turns[this.state.round].length;

    if(dartsThrown === 3){
      this.updateTurn();
    }
  }

  updatePlayer = (player) => {
    this.setState({
      players: [
        ...this.state.players.slice(0, this.state.currentPlayer),
        player,
        ...this.state.players.slice(this.state.currentPlayer +  1)
      ]
    })
  }

  updateScore = (score) => {
    let newTotal = this.state.scores[this.state.currentPlayer] + score;
    this.setState({
      scores:[
        ...this.state.scores.slice(0, this.state.currentPlayer),
        newTotal,
        ...this.state.scores.slice(this.state.currentPlayer + 1)
      ]
    })
  }

  validateScore = score => {
    let greaterThanLimit = (this.state.scores[this.state.currentPlayer] + score) > 301;
    if (!greaterThanLimit){
      this.updateScore(score);
      return score;
    }
    return 0;
  }

  throwDart = score => {
    let currentPlayer = { ...this.state.players[this.state.currentPlayer] };
    let currentTurn = currentPlayer.turns[this.state.round];

    score = this.validateScore(score);

    if(currentTurn === undefined){
      currentPlayer.turns.push([score]);
    }else if(currentTurn.length < 3){
      currentTurn.push(score);
    }

    this.updatePlayer(currentPlayer);
//    this.win()
    this.validateTurn();
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
        <Score scores={this.state.scores}/>
      </div>
      <button onClick={this.saveData}>Save Data</button>
    </div>
  }
}

Board.propTypes = {
  players: PropTypes.array
};

export default Board;
