import React from 'react';
import ReactDOM from 'react-dom';
import Board from './Board';

describe('Board element', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Board />, div);
  });

  describe('render the players and score elements',() => {
    const players = ['player1', 'player2'];
    const wrapper = shallow(<Board players={players}/>);
    it('render the players', () => {
      expect(wrapper.find('Player').length).toEqual(players.length);
    })
    it('render the score board', () => {
      expect(wrapper.find('Score').length).toEqual(1);
    })
  });
});
