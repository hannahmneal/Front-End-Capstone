// This component maintains state, routing and acts as the "dispatcher" to other components.
import React, { Component } from 'react';
import { Route } from "react-router-dom"
import GameData from "./components/GameData"
import GameForm from "./components/form/GameForm"
import GameList from "./components/GameList"
import GameCards from "./components/cards/GameCards"
import './App.css';
// import NavBar from "./nav/NavBar"

// First steps: POST, define state, create a form
//Complete "first steps" in this component first; when successful, separate components.
class AppControl extends Component {

  state = {

    // users: [],
    games: [],
    categories: []

  }
//=================================================================================================
  // Methods:

  //createGame is used within constructNewGameObj in NewGameForm to set the empty state to the new state that contains the form values:
  // The addGame method creates a newGameObj whose state is set in GameForm when the submit button is clicked.

    addGame = (newGameObj) => {

      // console.log(newGameObj);
      return GameData.post(newGameObj)
        .then(() => GameData.getAllGames()
        .then(game => (
          this.setState({
            games: game
          })
        )
        ))
        .then(() => console.log("this.state.games:", this.state.games))
      }

          getCategory = () => {
            GameData.getAllCategories().then(() => (
              category => (
                this.setState({
                  categories: category
                })
              )
            )
            )
          }
//==============================================================================================

// Delete method:
// add prevent default for the click event

          deleteGame = (id) => {
            return fetch(`http://localhost:5002/games/${id}`, {
              method: "DELETE"
            })
              .then(response => response.json())
              .then(() => fetch(`http://localhost:5002/games?_expand=category`))
              .then(response => response.json())
              .then(games =>
                this.setState({
                  games: games
                })
                )
              };

// Check:
// componentWillMount() {

//   GameData.getAllCategories().then(allCategories => {
//     console.log("componentWillMount: getallCategories:", allCategories);
//     // Logs the game categories to the console
//     this.setState({
//       categories: allCategories
//     })
//   })
// }

  componentDidMount() {
    // Create a method you can use to map over category objects in json:

    GameData.getAllGames().then(allGames => {
      console.log("componentDidMount: getallGames:", allGames);
      //Logs the database "games" array to the console.
      this.setState({
        games: allGames
      })
    })
    .then(() => {
      console.log(this.state.games)
    })
    GameData.getAllCategories().then(allCategories => {
      console.log("componentDidMount: getallCategories:", allCategories);
      // Logs the game categories to the console
      this.setState({
        categories: allCategories
      })
    })
  }
  //=======================================================================================================

  render() {

    // console.log(this.state.users);
    // console.log(this.state.games);
    // console.log(this.state.categories);

    return (
      <React.Fragment>
      <div className="App">
        <header className="App-header">
          <h5>Game Closet</h5>

{/* DASHBOARD (LIST) */}

          <Route exact path ="/list" render={props => {
            return (<GameList {...props} games={this.state.games}
            categories={this.state.categories} />)
          }}
          />

{/*  GAME */}

          <Route exact path ="/games/new" render={props => {
            return (<GameForm {...props}
            addGame={this.addGame}
            games={this.state.games}
            categories={this.state.categories}
            deleteGame={this.deleteGame}
            />
            )
          }}
          />

{/* DELETE GAME */}

          <Route exact path ="/games" render={props => {
            return (
            <GameList
              {...props}
              deleteGame={this.deleteGame}
              games={this.state.games}
              />
            )
          }}
          />

{/* Send deleteGame props to GameCards */}
          {/* <Route exact path ="/games" render={props => {
            return (
            <GameCards
              {...props}
              deleteGame={this.deleteGame}
              games={this.state.games}
              />
            )
          }}
          /> */}



          {/* <Route exact path="/games" render={props => {
            return ( <GameList {...props} deleteGame={this.deleteGame} games={this.state.games}/>
          )}}
          /> */}


        </header>
      </div>
      </React.Fragment>
    );
  }
}
export default AppControl;
