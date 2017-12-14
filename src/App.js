import React, { Component } from 'react';

import Board from './board/Board';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Board players={["player1", "player2"]}></Board>
      </div>
    );
  }
}

export default App;
