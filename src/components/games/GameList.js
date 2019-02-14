// This component is responsible for the logic behind the GameCards
import React, { Component } from "react";
import GameCards from "./GameCards";
// import UsersManager from "../../modules/UsersManager"
class GameList extends Component {

// state = {
//   usersGames: []
// }

// componentDidMount() {
// let sessionUser = sessionStorage.getItem("user")
// let sessionUserId= Number(sessionUser)
// console.log("sessionUser", sessionUserId);

//     UsersManager.getUsersGames(sessionUserId).then(game => {
//       // console.log("game:", game)

//       this.setState({
//         usersGames: game
//       })
//     }
//   );
//   }


  // {/* {console.log("this.props.usersGames", this.props.usersGames)}
  //           {console.log("this.props.categories", this.props.categories)} */}

  render() {
    // console.log(this.state.usersGames);

    return (
      <React.Fragment>
        <div>
          {this.props.usersGames.map(game => (
          // {this.state.usersGames.map(game => (

            <GameCards
              key={game.id}
              game={game}
              category={game.category}
              title={game.title}
              minPlayers={game.minPlayers}
              maxPlayers={game.maxPlayers}
              isCoop={game.isCoop}
              // isCoop={
              //     if(game.isCoop.value !== )
              // }
              deleteGame={this.props.deleteGame}
              categoryId={game.category.catName}
              userId={game.userId}
              {...this.props}
            />
          ))}
        </div>
      </React.Fragment>
    );
  }
}
export default GameList;
