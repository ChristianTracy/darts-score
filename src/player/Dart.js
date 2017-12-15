import React, { Component } from 'react';

class Dart extends Component {

  constructor(props){
    super(props);
    this.state = {
      score: 0
    }
  }


  throwDart = event => {
    event.preventDefault();
    this.props.throwDart(parseInt(this.state.score, 10));
  }

  changeHandler = event => {
    this.setState({
      score: event.target.value
    });
  }

  render(){
    let element = <span>{this.props.score}</span>;

    if(this.props.editable){
      element = (<form onSubmit={this.throwDart}>
        <input type='number' defaultValue={this.props.score} onChange={this.changeHandler} />
      </form>);
    }
    return <div>
        {element}
    </div>
  }
}

export default Dart;
