// This component maintains state, routing and acts as the "dispatcher" to other components.
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import GameData from "./components/GameData"

// First steps: POST, define state, create a form
//Complete "first steps" in this component first; when successful, separate components.
class AppControl extends Component {

  state = {

    users: [],
    categories: [],
    games: []

  }
//============================================================================================================
  // Methods:

  createGame = (newGame) => {
    // because this uses a fat-arrow function, it is necessary to use a "return" on next line?
    GameData.postNewGame(newGame)
      .then(() => GameData.getAllGames())
      .then(newGame =>
        this.setState({
          games: newGame
        })
      )
    }


  componentDidMount() {
    // When the fetch calls were contained in this component, this is how state was set:
    // const newState = {}
    //     .then(() => this.setState(newState));

    //Now that the fetch calls are in GameData, state is set this way:
    GameData.getAllGames().then(allGames => {
      // console.log(allGames);
      //Logs the database "games" array to the console.
      this.setState({
        games: allGames
      })
    })
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