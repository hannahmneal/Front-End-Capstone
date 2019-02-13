// This component maintains state, routing and acts as the "dispatcher" to other components.
import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import GameData from "./modules/GameData";
import GameForm from "./components/games/GameForm";
import GameList from "./components/games/GameList";
import UserRegistrationForm from "./components/users/UserRegistrationForm";
import UserLoginForm from "./components/users/UserLoginForm";
import UsersManager from "./modules/UsersManager";
import GameCards from "./components/games/GameCards"

import "./App.css";
// import NavBar from "./nav/NavBar"
class AppControl extends Component {
  isAuthenticated = () => sessionStorage.getItem("user") !== null
  state = {
    users: [],
    games: [],
    categories: [],
    userId: sessionStorage.getItem("user")
  };
  // The session storage for "user" is set after the verification step in UserLoginForm.
  //=================================================================================================
  // Methods:

  // addGame is used within constructNewGameObj in NewGameForm to set the empty state to the new state that contains the form values:
  // The addGame method creates a newGameObj whose state is set in GameForm when the submit button is clicked.

  addGame = newGameObj => {
    // console.log(newGameObj);
    return GameData.post(newGameObj)
      .then(() =>
        GameData.getAllGames().then(game =>
          this.setState({
            games: game
          })
        )
      )
      .then(() => console.log("this.state.games:", this.state.games));
  };

  // User Verification (called in UserLoginForm):

  verifyUser = (nameInput, passInput) => {
    return UsersManager.getUser(nameInput, passInput)
  }
  // Get game categories for dropdown in "Add New Game" form:

  getCategory = () => {
    GameData.getAllCategories().then(() => category =>
      this.setState({
        categories: category
      })
    );
  };

  // Delete method:

  deleteGame = id => {
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
      );
  };
  //==============================================================================================
  //  LIFE CYCLE METHODS:

  // Check:
//   componentWillMount() {

//     GameData.getAllCategories().then(allCategories => {
//       console.log("componentWillMount: getallCategories:", allCategories);
//       // Logs the game categories to the console
//   })
// }

  componentDidMount() {
    GameData.getAllGames()
      .then(allGames => {
        console.log("componentDidMount: getallGames:", allGames);
        this.setState({
          games: allGames
        });
      })
      .then(() => {
        console.log(this.state.games);
      });
    GameData.getAllCategories().then(allCategories => {
      // console.log("componentDidMount: getallCategories:", allCategories);
      this.setState({
        categories: allCategories
      });
    });
    UsersManager.getAllUsers().then(allUsers => {
      // console.log("componentDidMount: getallUsers:", allUsers);
      this.setState({
        users: allUsers
      });
    });
  }
  //=======================================================================================================

  render() {
    // console.log(this.state.users);
    // console.log(this.state.games);
    // console.log(this.state.categories);
    console.log(this.state.users);

    return (
      <React.Fragment>
        <div className="App">
          <header className="App-header">
            <h5>Game Closet</h5>

            <Route
              exact
              path="/"
              render={props => {
                return (
                  <UserLoginForm
                  {...props}
                  verifyUser={this.verifyUser}
                  getUser={this.getUser}
                  users={this.state.users}
                  authenticateUser={this.authenticateUser}
                  />
                );
              }}
            />
{/* DASHBOARD (LIST); GameList renders Cards, which will show the user dashboard */}
            <Route
              exact
              path="/games/list"
              render={props => {
                if(this.isAuthenticated()) {
                return(<GameList
                    {...props}
                    games={this.state.games}
                    categories={this.state.categories}
                    deleteGames={this.deleteGame}
                    authenticateUser={this.authenticateUser}
                    />)} else {
                      return alert("Nope!");
                    }
              }}
              />

              <Route
              exact
              path="/games/dashboard"
              render={props => {
                if(this.isAuthenticated()) {
                return(<GameCards
                    {...props}
                    games={this.state.games}
                    categories={this.state.categories}
                    deleteGames={this.deleteGame}
                    authenticateUser={this.authenticateUser}
                    />)} else {
                      return (<Redirect to ="/" />);
                    }
                }}
            />

            {/*  GAME */}

            <Route
              exact
              path="/games/new"
              render={props => {
                return (<GameForm
                    {...props}
                    addGame={this.addGame}
                    games={this.state.games}
                    categories={this.state.categories}
                    deleteGame={this.deleteGame}
                    authenticateUser={this.authenticateUser}

                  />)
              }}
            />

            {/*  USERS */}

            <Route
              exact
              path="/users/new"
              render={props => {
                if(this.isAuthenticated()) {
                return (
                  <UserRegistrationForm
                    {...props}
                    users={this.state.users}
                    addUser={this.addUser}
                    userId={this.state.userId}
                />)} else {
                  return (<Redirect to ="/games/dashboard" />);
                }
              }
            }
            />
          </header>
        </div>
      </React.Fragment>
    );
  }
}
export default AppControl;
