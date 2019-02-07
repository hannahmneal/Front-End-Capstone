// This component maintains state, routing and acts as the "dispatcher" to other components.
import React, { Component } from 'react';
import { Route } from "react-router-dom"
import GameData from "./components/GameData"
import GameForm from "./components/GameForm"
import './App.css';
// import NavBar from "./nav/NavBar"

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

  //createGame is used within constructNewGameObj in NewGameForm to set the empty state to the new state that contains the form values:
  addGame = (newGameObj) => {
    console.log(newGameObj);

    return GameData.post(newGameObj)
      .then(() => GameData.getAllGames())
      .then(game =>
        this.setState({
          games: game
      })
    )
  }

  // Create a method you can use to map over category objects in json:

  componentDidMount() {

    GameData.getAllGames().then(allGames => {
      // console.log(allGames);
      //Logs the database "games" array to the console.
      this.setState({
        games: allGames
      })
    })
    GameData.getAllCategories().then(allCategories => {
      console.log(allCategories);
      // Logs the game categories to the console
      this.setState({
        categories: allCategories
      })
    })
  }

  //============================================================================================================

  render() {

    // console.log(this.state.users);
    // console.log(this.state.games);
    // console.log(this.state.categories);

    return (
      <React.Fragment>
      <div className="App">
        <header className="App-header">
          <h5>Game Closet</h5>
          <Route exact path ="/" render={props => {
            return <GameForm {...props} addGame={this.addGame}/>
          }}
          />
        </header>
      </div>
      </React.Fragment>
    );
  }
}
export default AppControl;

// After resolving error resulting from onClick (see bottom of NewGameForm for notes), I added {...this.props} to <NewGameForm/>.
//Still nothing posts to database.