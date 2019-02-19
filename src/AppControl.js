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

  addGame = (newGameObj) => {
    console.log(newGameObj);
    return GameData.post(newGameObj)
    .then(() =>
    UsersManager.getUsersGames(parseInt(sessionStorage.getItem("user"))).then(game =>
      this.setState({
        // usersGames: game // User dash does not auto-refresh
        games: game // This auto-refreshes user's dash.
      })
      ))
      .then(() => console.log("this.state.games:", this.state.games));
    };

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
        // After deleting games, use user userId to fetch user-specific games
        .then(response => response.json())
        // .then(() => fetch(`http://localhost:5002/games?_expand=category`))
        // .then(response => response.json())
        // .then(games =>
        //   this.setState({
        //     games: games
        //   })
        // )
        .then(() => UsersManager.getUsersGames(parseInt(sessionStorage.getItem("user"))).then(game =>
          this.setState({
            // usersGames: game // User dash does not auto-refresh
            games: game // This auto-refreshes user's dash.
          })
          ))
    );
  };

  updateGame = (id, editedGameObj) => {
    return GameData.editThisGame(id, editedGameObj)
    .then(() => UsersManager.getUsersGames(this.state.userId))
    .then(game => {
      this.setState({
        games: game
      })
    })
  }
  //==============================================================================================
  //  LIFE CYCLE:

  componentDidMount() {
    // This replaced "getAllGames" below after login was implemented. Games are user-specific on dash but only if the user manually refreshes the page if coming from login:
    UsersManager.getUsersGames(parseInt(sessionStorage.getItem("user"))).then(game =>
      this.setState({
        // usersGames: game // User dash does not auto-refresh
        games: game // This auto-refreshes user's dash.
      })
      )
    // Prior to UsersManager.getUsersGames above, this is the code that pulled all games but this was set up before user login/credentials:
    // GameData.getAllGames()
    //   .then(allGames => {
    //     // console.log("componentDidMount: getallGames:", allGames);
    //     this.setState({
    //       games: allGames
    //     });
    //   })
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
    // console.log(this.state.usersGames);


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
                      // deleteGame={this.deleteGame}
                      // updateGame={this.updateGame}
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
              path="/games/edit/:gameId(\d+)"
              // MDN Regular Expressions: \d matches a digit character; + matches the preceding expression 1 or more times (all a's in caaaandy but nothing in cndy)
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
