// This component maintains state, routing and acts as the "dispatcher" to other components.
import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import GameData from "./modules/GameData";
import GameForm from "./components/games/GameForm";
import GameList from "./components/games/GameList";
import GameEditForm from "./components/games/GameEditForm"
import UserRegistrationForm from "./components/users/UserRegistrationForm";
import UserLoginForm from "./components/users/UserLoginForm";
import UsersManager from "./modules/UsersManager";
class AppControl extends Component {
  isAuthenticated = () => sessionStorage.getItem("user") !== null;
  state = {
    users: [],
    user: {},
    games: [],
    categories: [],
    usersGames: [],
    userId: ""
  };

  //============================= GAMES ============================

  // Updates the state of games with those games associated with the user currently in session storage.
  // This function is called at the end of addGame(), deleteGame() and updateGame() in AppControl, and at the end of handleLoginSubmit() in UserLoginForm.


  setUser = () => {
    // This function is called in UserLoginForm component and sets the userId state in AppControl to that of the logged-in user.

    UsersManager.getUserById(parseInt(sessionStorage.getItem("user")))
      .then(user => {
        this.setState({
          user: user,
          userId: user.id
        })

      })
  }

  // Used by other components to reset global state:
  updateGameState = () => {

    UsersManager.getUsersGames(parseInt(sessionStorage.getItem("user")))
      .then(games =>   // "games" are the games associated with the user that is currently logged in.
        this.setState({
          games: games // This auto-refreshes user's dash.
        })
      )

  }

  //============================== LOGIN FUNCTIONS ================================

  // User Verification (called in UserLoginForm). Plugs the user-entered username and password from the login form into the local json database URL (via "getUser" in UsersManager). If there is a user in the database with the given username and password, an "user object" is made available.

  verifyUser = (nameInput, passInput) => {

    return UsersManager.getUser(nameInput, passInput);
  };

  //========================== USERS ======================

  addUser = (newUserObj) => {

    return UsersManager.postUser(newUserObj)
      .then(() => UsersManager.getAllUsers()
        .then(users =>
          this.setState({
            users: users
          })))
  }

  //========================== GAMES ======================

  // Adds a game to the database and then refreshes the state of games to show the games of the currently-logged-in user.
  // The newGameObj object is created and addGame is called in GameForm.

  addGame = (newGameObj) => {
    // console.log(newGameObj); // // TEST
    return GameData.post(newGameObj)
      .then(() => this.updateGameState())
    .then(() => console.log("this.state.games:", this.state.games)); // // TEST
  };


  // Deletes a specific game based on its id:

  deleteGame = (id) => {
    return (
      fetch(`http://localhost:5002/games/${id}`, {
        method: "DELETE"
      })
        // After deleting games, use user userId to fetch user-specific games:
        .then(response => response.json())
        .then(() => UsersManager.getUsersGames(parseInt(sessionStorage.getItem("user"))).then(games =>
          this.setState({
            games: games
          })
        ))
    );
  };

  // Identifies the specific game to be edited by its id and uses a "PUT" (via editThisGame() in GameData.js) to replace the old game object with the new, edited game object. After this is accomplished, updateGameState() refreshes the user-specific state of games.

  updateGame = (id, editedGameObj) => {
    return GameData.editThisGame(id, editedGameObj)
      .then(() => this.updateGameState())
  }
  //==============================================================================
  //  LIFE CYCLE:

  componentDidMount() {   // Triggers a re-rendering of the DOM; I'm using this method to load data into AppControl and set state for my components.

    // console.log(this.state.userId); // // TEST

   UsersManager.getAllUsers().then(allUsers => {
      this.setState({
        users: allUsers
      });
    })

   UsersManager.getUsersGames(parseInt(sessionStorage.getItem("user"))).then(games =>
      this.setState({
        games: games
      })
      )
      // console.log(this.state.games);

    GameData.getAllCategories().then(allCategories => {
      // console.log("componentDidMount: getallCategories:", allCategories);
      this.setState({
        categories: allCategories
      });
    });
  }
  //===========================================================================

  render() {
    // console.log(this.state.users);
    // console.log(this.state.games);
    // console.log(this.state.categories);

    return (
        <React.Fragment>
      <div className="App">
          {/* <header className="App-header">
            <h5>Game Closet</h5> */}
            {/* </header> */}

            <Route
              exact
              path="/login"
              render={props => {
                console.log("login is authenticated");

                return (
                  <UserLoginForm
                    {...props}
                    verifyUser={this.verifyUser}
                    updateGameState={this.updateGameState}
                    setUser={this.setUser}
                  />
                );
              }}
            />

            <Route
              exact
              path="/register"
              render={props => {
                console.log("registration is authenticated");

                return (
                  <UserRegistrationForm
                    {...props}
                    updateGameState={this.updateGameState}
                    addUser={this.addUser}
                  />
                );
              }}
            />

            {/* DASHBOARD (LIST); GameList renders Cards, which will show the user dashboard */}
            <Route
              exact
              path="/list"
              render={props => {
                if (this.isAuthenticated()) {

                  console.log("gamelist is authenticated");
                  return (
                    <GameList
                      {...props}
                      games={this.state.games}
                      categories={this.state.categories}
                      deleteGame={this.deleteGame}
                      updateGame={this.updateGame}
                      userId={this.state.userId}
                    />
                  );
                } else {
                  return <Redirect to="/login" />;
                }
              }}
            />

            {/*  GAME FORM */}

            <Route
              exact
              path="/games/new"
              render={props => {
                if (this.isAuthenticated()) {
                  return (
                    <GameForm
                      {...props}
                      addGame={this.addGame}
                      games={this.state.games}
                      categories={this.state.categories}
                      userId={this.state.userId}
                      updateGameState={this.updateGameState}
                    />
                  );
                } else {
                  return <Redirect to="/login" />;
                }
              }}
            />

            {/*  EDIT FORM */}

            <Route
              exact
              path="/games/edit/:gameId(\d+)"
              // MDN Regular Expressions: \d matches a digit character; + matches the preceding expression 1 or more times (all a's in caaaandy but nothing in cndy)
              render={props => {
                if (this.isAuthenticated()) {
                  return (
                    <GameEditForm
                      {...props}
                      updateGame={this.updateGame}
                      games={this.state.games}
                      categories={this.state.categories}
                      userId={this.state.userId}
                      updateGameState={this.updateGameState}
                    />)
                } else {
                  return (<Redirect to="/login" />);
                }
              }
              }
            />
        {/* </header> */}
        </div>
      </React.Fragment>
    );
  }
}
export default AppControl;
