import React from 'react';
import PropTypes from 'prop-types';
import Player from '../player/Player';
import Score from './Score';
import firebaseConnection from '../utils/firebaseConnection';
import './board.css';
import { LIMIT_SCORE, DARTS_LIMIT } from '../utils/constants';


class Board extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      currentPlayer: 0,
      round: 0,
      winner: null
    };

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

      let scores = Array(players.length).fill(null);

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
        round += 1;
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

    if(dartsThrown === DARTS_LIMIT){
      this.updateTurn();
    }
  }

  updatePlayer = player => {
    this.setState({
      players: [
        ...this.state.players.slice(0, this.state.currentPlayer),
        player,
        ...this.state.players.slice(this.state.currentPlayer +  1)
      ]
    })
  }

  updateScore = score => {
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
    let greaterThanLimit = (this.state.scores[this.state.currentPlayer] + score) > LIMIT_SCORE;
    if (!greaterThanLimit){
      this.updateScore(score);
      return score;
    }
    return 0;
  }

  validateWin = score => {
    let currentPlayer = this.state.currentPlayer;

    if(score === LIMIT_SCORE){
      this.setState({
        winner: currentPlayer
      });
    }
  }


  throwDart = score => {
    let currentPlayerScore = this.state.scores[this.state.currentPlayer];
    let currentPlayer = { ...this.state.players[this.state.currentPlayer] };
    let currentTurn = currentPlayer.turns[this.state.round];
    let totalNewScore;

    score = this.validateScore(score);

    if(currentTurn === undefined){
      currentPlayer.turns.push([score]);
    }
    else if(currentTurn.length < DARTS_LIMIT){
      currentTurn.push(score);
    }

    if(score === 0){
      currentPlayerScore -= currentPlayer.turns[this.state.round].reduce((acc, next) => {
        return acc + next;
      }, 0);
      currentPlayer.turns[this.state.round] = [0, 0, 0];
      
      this.setState({
        scores:[
          ...this.state.scores.slice(0, this.state.currentPlayer),
          currentPlayerScore,
          ...this.state.scores.slice(this.state.currentPlayer + 1)
        ]
      })
      
    }

    totalNewScore = currentPlayerScore + score;


    this.updatePlayer(currentPlayer);
    this.validateWin(totalNewScore);
    this.validateTurn();
  }

  render(){
    let players;
    let winner;
    let button;
    if (this.props.players) {
      players = this.state.players.map((player, idx) => {
        return <Player key={idx}
          name={player.name}
          turns={player.turns}
          isPlaying={this.isPlaying(idx)}
          throwDart={this.throwDart}
          winner={this.state.winner} />
      })
    }

    if(this.state.winner !== null){
      winner = <div>Winner: {this.state.players[this.state.winner].name}</div>
      button = <button onClick={this.saveData}>Save Data</button>
    }

    return <div className="board">
      <div className="body">
        {players}
      </div>
      <div className="totals">
        <Score scores={this.state.scores}/>
      </div>
      {winner}
      {button}
    </div>
  }
}

Board.propTypes = {
  players: PropTypes.array
};

export default Board;
