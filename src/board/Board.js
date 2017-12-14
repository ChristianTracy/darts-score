import React from 'react';
import PropTypes from 'prop-types';
import Player from '../player/Player';
import Score from './Score';
import { log } from 'util';

class Board extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      currentPlayer: 0
    };
  }

  componentWillMount(){
    if(this.props.players){
      let players = this.props.players.map((playerName) => {
        return {
          name: playerName,
        };
      }); 
  
      this.setState({
        players
      });
    }
  }


  render(){
    let players;
    if (this.props.players) {
      players = this.props.players.map((player, idx) => {
        return <Player key={idx} name={player} isPlaying={idx === this.state.currentPlayer} />
      })
    }
    return <div>
        {players}
        <Score scores={[1,2]}/>
    </div>
  }
}

Board.propTypes = {
  players: PropTypes.array
};

export default Board;
