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

          // () =>
        // {
          // console.log("addGame GameData.getAllGames:", GameData.getAllGames);
          // console.log("addGame GameData.getAllGames check State:", this.state);
        // }
        // )
        // )

        // .then(game => (
        //   this.setState({
        //     games: game

        //   })

        //   // console.log(game);
        //   )
        //   )
        // }

            // chain another .then to get all categories:
            // .then(() => GameData.getAllCategories(() => {
            //   if(this.state.categoryId !== this.props.category.id) {
            //     console.log("categoryId and category.id do not match")
            //   } else {
            //     const setCategory({categoryId}) => (
            //       categoryId: this.props.category.catName
            //     )
            //   }
            //   )
            // })
//==============================================================================================
// Fooling around
          // .then(games => (games.map(games => {
          //   return games.games
          // })))
//==============================================================================================
// Fooling around

          // .then(categories => (categories.map(category => {
          //   return category.categories
          // })))
          // .then(category => (
          //   this.setState({
          //     categories: category
          //   })
          // ))
//==============================================================================================
// 2/9: Fooling around with linking games.categoryId to categories.id and displaying the value of categories.catName

        // if(this.props.games.categoryId !== this.props.categories.id) {
        //   console.log("this.props.categories.parseInt(id) didn't work. Value: ", this.props.categories.id);
        // } else {
        //   this.props.categories.map(category => (
        //     console.log(category)
        //   ))}
        //   })) // Closing brackets and parents from line 33 (so this if statement is included)
//==============================================================================================
// The code above (2/9) didn't work; the categories array is still empty.
// map over categories because it is within your games array
// then, insert the map before setting state; this is what embed should be doing anyway.
        // }))
        //   .then(() => this.games.categories.map(category => (
        //     this.setState({
        //       categories: category
        //     })
          // ))
//==============================================================================================

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

          deleteGame = id => {
            return fetch(`http://localhost:5002/games/${id}`, {
              method: "DELETE"
            })
              .then(response => response.json())
              .then(() => fetch(`http://localhost:5002/games`))
              .then(response => response.json())
              .then(games =>
                this.setState({
                  games: games
                })
              );
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
          <Route exact path ="/list" render={props => {
            return (<GameList {...props} games={this.state.games}
            categories={this.state.categories} />)
          }}
          />

          <Route exact path ="/games" render={props => {
            return (<GameForm {...props}
            addGame={this.addGame}
            categories={this.state.categories}/>)
          }}
          />

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
