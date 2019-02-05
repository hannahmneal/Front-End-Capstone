// This component maintains state, routing and acts as the "dispatcher" to other components.
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';

// First steps:
// GET all
// POST, define state, create a form

//Complete "first steps" in this component first; when successful, separate components.

class AppControl extends Component {

  state = {

    users: [],
    categories: [],
    games: []

  }
//============================================================================================================
  // Fetch:

  componentDidMount() {
    const newState = {}

    fetch("http://localhost:5002/users")
        .then(r => r.json())
        .then(users => (newState.users = users))
        .then(() => fetch("http://localhost:5002/games")
        .then(r => r.json()))
        .then(games => (newState.games = games))
        .then(() => fetch("http://localhost:5002/categories")
        .then(r => r.json()))
        .then(categories => (newState.categories = categories))

        .then(() => this.setState(newState));
}


  //============================================================================================================


  render() {

    console.log(this.state.users);
    console.log(this.state.games);
    console.log(this.state.categories);

    return (
      <div className="App">
        <header className="App-header">
          <h5>Game Closet</h5>
            <React.Fragment>
              {/* {this.state.users}
              {this.state.games}
              {this.state.categories} */}
            </React.Fragment>
        </header>
      </div>
    );
  }
}

export default AppControl;