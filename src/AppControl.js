// This component maintains state, routing and acts as the "dispatcher" to other components.
import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import GameData from "./modules/GameData";
import GameForm from "./components/games/GameForm";
import GameCards from "./components/games/GameCards";
// import UserRegistrationForm from "./components/users/UserRegistrationForm";
import UserLoginForm from "./components/users/UserLoginForm";
import UsersManager from "./modules/UsersManager";

import "./App.css";
// import NavBar from "./nav/NavBar"
class AppControl extends Component {
  isAuthenticated = () => sessionStorage.getItem("user") !== null;
  state = {
    users: [],
    games: [],
    categories: [],
    usersGames: [],
    userId: Number(sessionStorage.getItem("user"))
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

  verifyUser = (usernameInput, passInput) => {
    return UsersManager.getUser(usernameInput, passInput);
    // UsersManager.getUser: http://localhost:5002/users?username=hannahmneal&password=pass   // returns: users = [{matched user object}]
  };

  getCategory = () => {
    GameData.getAllCategories().then(() => category =>
      this.setState({
        categories: category
      })
    );
  };

  // Delete method:

  deleteGameOfUser = id => {
    return fetch(`http://localhost:5002/games/${id}`, {
      method: "DELETE"
    })
      .then(response => response.json())
      .then(() => fetch(`http://localhost:5002/games?_expand=category`))
      .then(response => response.json())
      .then(games =>
        this.setState({
          games: games
        }).then(console.log(this.state.games))
      );
  };

  //==============================================================================================
  //  LIFE CYCLE:

  componentDidMount() {
    //From: localhost:5002/games?_expand=category //games = [{ category = {...} }]
    // NOTICE: category is singular in embedded URL
    GameData.getAllGames()
      .then(allGames => {
        // console.log("componentDidMount: getallGames:", allGames);
        this.setState({
          games: allGames
        });
      })
      .then(() => {
        // console.log(this.state.games);
      });

    //From: localhost:5002/categories // categories = [{...}]
    // NOTICE: plural categories
    GameData.getAllCategories().then(allCategories => {
      // console.log("componentDidMount: getallCategories:", allCategories);
      this.setState({
        categories: allCategories
      });
    });

    // From: localhost:5002/users // users = [{...}]
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

    return (
      <React.Fragment>
        <div className="App">
          <header className="App-header">
            <h5>Game Closet</h5>

            <Route
              exact
              path="/login"
              render={props => {
                return (
                  <UserLoginForm
                    {...props}
                    verifyUser={this.verifyUser}
                    authenticateUser={this.authenticateUser}
                    games={this.state.games}
                    // getUsersGames={this.getUsersGames}
                  />
                );
              }}
            />
            {/* DASHBOARD (LIST); GameList renders Cards, which will show the user dashboard */}
            {/* <Route
              exact
              path="/games"
              render={props => {
                if(this.isAuthenticated()) {
                return(<GameList
                    {...props}
                    authenticateUser={this.authenticateUser}
                    // usersGames= {this.state.usersGames}
                    userId={this.state.userId}
                    />)} else {
                      return alert("Nope!");
                    }
              }}
              /> */}

            {/*  GAME */}

            <Route
              exact
              path="/games/new"
              render={props => {
                if (this.isAuthenticated()) {
                  return (
                    <GameForm
                      {...props}
                      authenticateUser={this.authenticateUser}
                      addGame={this.addGame}
                      games={this.state.games}
                      categories={this.state.categories}
                      deleteGameOfUser={this.deleteGameOfUser}
                    />
                  );
                } else {
                  return <Redirect to="/login" />;
                }
              }}
            />
            <Route
              exact
              path="/games"
              render={props => {
                if (this.isAuthenticated()) {
                  return (
                    <GameCards
                      {...props}
                      authenticateUser={this.authenticateUser}
                      games={this.state.games}
                      categories={this.state.categories}
                      users={this.state.users}
                      userId={this.state.userId}
                      usersGames={this.state.usersGames}
                      deleteGameOfUser={this.deleteGameOfUser}
                    />
                  );
                } else {
                  return <Redirect to="/login" />;
                }
              }}
            />

            {/*  USERS */}

            {/* <Route
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
            /> */}
          </header>
        </div>
      </React.Fragment>
    );
  }
}
export default AppControl;
