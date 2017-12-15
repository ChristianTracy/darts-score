import React, { Component } from 'react';
import Dart from './Dart';
import { DARTS_LIMIT } from '../utils/constants';

class Turn extends Component {

  constructor(props){
    super(props);
    this.state = {
      darts: this.props.darts
    }
  }

  componentWillReceiveProps(newProps){
    if(newProps.darts.length !== this.state.darts.length){
      this.setState({
        darts: newProps.darts
      });
    }
  }
  render(){

    let darts;
    if(this.props.darts.length === 0 && this.props.isPlaying){
      darts = [
        <Dart key={0} score={0} editable={true} throwDart={this.props.throwDart} />
      ];
    }
    else{
      darts = this.props.darts.map((dart, idx) => {
        return <Dart key={idx} score={dart} editable={false} />
      });
      if(this.props.darts.length < DARTS_LIMIT && this.props.isPlaying){
        darts.push(<Dart key={this.props.darts.length} score={0} editable={true} throwDart={this.props.throwDart} />);
      }
    }
    return <div>{darts}</div>
  }
}

export default Turn;
