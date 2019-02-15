// This component maintains state, routing and acts as the "dispatcher" to other components.
import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import GameData from "./modules/GameData";
import GameForm from "./components/games/GameForm";
import GameList from "./components/games/GameList";
import GameEditForm from "./components/games/GameEditForm"
// import UserRegistrationForm from "./components/users/UserRegistrationForm";
import UserLoginForm from "./components/users/UserLoginForm";
import UsersManager from "./modules/UsersManager";
// import GameCards from "./components/games/GameCards"
// import "./App.css";
// import NavBar from "./nav/NavBar"
class AppControl extends Component {
  isAuthenticated = () => sessionStorage.getItem("user") !== null;
  state = {
    users: [],
    games: [],
    categories: [],
    usersGames: [],
    userId: parseInt(sessionStorage.getItem("user"))
  };
  // The session storage for "user" is set after the verification step in UserLoginForm.

  //=================================================================================================
  // Methods:

  // addGame is used within constructNewGameObj in NewGameForm to set the empty state to the new state that contains the form values:
  // The addGame method creates a newGameObj whose state is set in GameForm when the submit button is clicked.


  addGame = (newGameObj) => {
    console.log(newGameObj);
    return GameData.post(newGameObj)
    .then(() =>
    UsersManager.getUsersGames(this.state.userId).then(game =>
      this.setState({
        usersGames: game
      })
      )
      )
      .then(() => console.log("this.state.games:", this.state.games));
    };

// Use this to test different GET methods after a game is posted:
      // addGame = newGameObj => {
      //   // console.log(newGameObj);
      //   return GameData.post(newGameObj)
      //     .then(() =>
      //       GameData.getAllGames().then(game =>
      //         this.setState({
      //           games: game
      //         })
      //       )
      //     )
      //     .then(() => console.log("this.state.games:", this.state.games));
      // };

  // User Verification (called in UserLoginForm):
  verifyUser = (nameInput, passInput) => {
    return UsersManager.getUser(nameInput, passInput);
  };

  // This is necessary for populating the dropdown:
  getCategory = () => {
    GameData.getAllCategories().then(() => category =>
      this.setState({
        categories: category
      })
    );
  };

  // Delete method for a specific game:
  deleteGame = (id) => {
    return (
      fetch(`http://localhost:5002/games/${id}`, {
        method: "DELETE"
      })
        // use game.id to delete game
        // After deleting games, user userId to fetch user-specific games
        .then(response => response.json())
        .then(() => fetch(`http://localhost:5002/games?_expand=category`))
        .then(response => response.json())
        .then(games =>
          this.setState({
            games: games
          })
        )
    );
  };

  // editGame = (editedGameObj) => {
  //   GameData.editGame(editedGameObj)
  //   .then( () => {
  //     UsersManager.getUsersGames(this.state.userId).then(game =>
  //       this.setState({
  //         usersGames: game
  //       })
  //       )
  //     })
  //       .then(() => console.log("this.state.games:", this.state.games));
  //     }

  updateGame = (gameId, editedGameObj, userId) => {
    return GameData.editThisGame(gameId, editedGameObj, userId)
    .then(() => UsersManager.getUsersGames(this.state.userId))
    .then(games => {
      this.setState({
        games: games
      })
    })
  }
  //==============================================================================================
  //  LIFE CYCLE:

  componentDidMount() {
    GameData.getAllGames()
      .then(allGames => {
        // console.log("componentDidMount: getallGames:", allGames);
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

    UsersManager.getUsersGames((parseInt(sessionStorage.getItem("user")))).then(game => {
      console.log("componentDidMount:", game);
      this.setState({
        usersGames: game
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
                    getUser={this.getUser}
                    users={this.state.users}
                    authenticateUser={this.authenticateUser}
                    games={this.state.games}
                    // getUsersGames={this.getUsersGames}
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
                  return (
                    <GameList
                      {...props}
                      games={this.state.games}
                      categories={this.state.categories}
                      deleteGame={this.deleteGame}
                      updateGame={this.updateGame}
                      authenticateUser={this.authenticateUser}
                      usersGames={this.state.usersGames}
                      userId={this.state.userId}
                    />
                  );
                } else {
                  return <Redirect to="/login" />;
                }
              }}
            />

            {/* <Route
              exact
              path="/games/edit"
              render={props => {
                if (this.isAuthenticated()) {
                  return (
                    <GameCards
                      {...props}
                      games={this.state.games}
                      categories={this.state.categories}
                      deleteGames={this.deleteGame}
                      authenticateUser={this.authenticateUser}
                      usersGames={this.state.usersGames}
                      userId={this.state.userId}
                    />
                  );
                  } else {
                    return <Redirect to="/login" />;
                  }
              }}
            /> */}

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
                      deleteGame={this.deleteGame}
                      updateGame={this.updateGame}
                      authenticateUser={this.authenticateUser}
                      userId={this.state.userId}
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
              path="/games/edit"
              render={props => {
                if(this.isAuthenticated()) {
                return (
                  <GameEditForm
                    {...props}
                    updateGame={this.updateGame}
                    games={this.state.games}
                    categories={this.state.categories}
                    authenticateUser={this.authenticateUser}
                    userId={this.state.userId}
                />)} else {
                  return (<Redirect to ="/login" />);
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
