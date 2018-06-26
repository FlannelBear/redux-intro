import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { connect } from 'react-redux';

// Allowing us to access redux state on props
const mapReduxStateToProps = ({counterReducer, nameChanger, colorChanger}) => ({
  counterReducer,
  nameChanger,
  colorChanger
  // Is that all? Yes, that's it!
});

class App extends Component {

  constructor(){
    super();

    this.state = {name: '', color: ''}
  }

  changeName = (event) => {
    this.setState({name: event.target.value});
  }

  submitNameChange = (event) => {
    event.preventDefault();
    this.props.dispatch({type: 'NAME', payload: this.state.name});
    this.state.name = '';
  }

  changeColor = (event) => {
    this.setState({color: event.target.value});
  }

  submitColorChange = (event) => {
    event.preventDefault();
    this.props.dispatch({type: 'COLOR', payload: this.state.color});
    this.state.color = '';
  }

  deleteAllColors = () => {
    this.props.dispatch({type: 'DELETE_COLORS'});
  }

  render() {
    return (
      <div className="App">
        <button onClick={() => {this.props.dispatch({type: 'ADD'})}}>Add</button>
        <button onClick={() => {this.props.dispatch({type: 'SUBTRACT'})}}>Subtract</button>
        <h1>{this.props.counterReducer}</h1>
        <form onSubmit={this.submitNameChange}>
          <input type="text" placeholder="name" onChange={this.changeName} value={this.state.name}/>
          <input type="submit" value="Submit" />
        </form>
        <h1>{this.props.nameChanger.name}</h1>
        <form onSubmit={this.submitColorChange}>
          <input type="text" placeholder="background color" onChange={this.changeColor} value={this.state.color}/>
          <input type="submit" value="Submit" />
        </form>
        <button onClick={this.deleteAllColors}>Delete All Colors</button>
        <ul>
          {this.props.colorChanger.map(color => <li>{color}</li>)}
        </ul>
      </div>
    );
  }
}

// Calling connect without passing anything in allows dispatch
// To get information out, we need to pass mapReduxStateToProps to connect
export default connect(mapReduxStateToProps)(App);
