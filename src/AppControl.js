// This component maintains state, routing and acts as the "dispatcher" to other components.
import React, { Component } from 'react';
import { Route } from "react-router-dom"
import GameData from "./components/GameData"
import GameForm from "./components/form/GameForm"
import GameList from "./components/GameList"
import './App.css';
// import NavBar from "./nav/NavBar"

// First steps: POST, define state, create a form
//Complete "first steps" in this component first; when successful, separate components.
class AppControl extends Component {

  state = {

    // users: [],
    categories: [],
    games: []

  }
//============================================================================================================
  // Methods:

  //createGame is used within constructNewGameObj in NewGameForm to set the empty state to the new state that contains the form values:
  // addGame = (newGameObj) => {

  //   // console.log(newGameObj);
  //   return GameData.post(newGameObj)
  //     .then(() => GameData.getAllGames(() => {
  //       console.log("addGame GameData.getAllGames:", GameData.getAllGames);
  //     }))
  //     .then(game =>
  //       this.setState({
  //       games: game
  //     }))
  //   }

    addGame = (newGameObj) => {

      // console.log(newGameObj);
      return GameData.post(newGameObj)
        .then(() => GameData.getAllGames(() => {
          console.log("addGame GameData.getAllGames:", GameData.getAllGames);
        }))
          .then(games => (games.map(games => {
            return games.games
          })))
            .then(game => (
              this.setState({
              games: game
            })))
    }


    // The addGame method creates a newGameObj whose state is set in GameForm when the submit button on the form is clicked.

  componentDidMount() {
    // Create a method you can use to map over category objects in json:

    GameData.getAllGames().then(allGames => {
      console.log("componentDidMount: getallGames:", allGames);
      //Logs the database "games" array to the console.
      this.setState({
        games: allGames
      })
    })
    GameData.getAllCategories().then(allCategories => {
      console.log("componentDidMount: getallCategories:", allCategories);
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
            return <GameList {...props} games={this.state.games} categories={this.state.categories} />
          }}
          />

          <Route exact path ="/games" render={props => {
            return <GameForm {...props} addGame={this.addGame} categories={this.state.categories}/>
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