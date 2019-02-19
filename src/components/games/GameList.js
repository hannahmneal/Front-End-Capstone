// This component is responsible for the logic behind the GameCards
import React, { Component } from "react";
import GameCards from "./GameCards";
// import UsersManager from "../../modules/UsersManager"
class GameList extends Component {
// Because GameCards and GameList are siblings and GameList is top-level for games, this is where you want to put "toggleEdit" to pass game=game.id;
// Set the state in this component and render the edit form from here
// Currently, the state needs to be the parent of these siblings
// Rachel's Friends.js = my Game.js, and her FriendList is my GameCards

  render() {
    // console.log(this.state.usersGames);

    return (
      <React.Fragment>
        <div>
          {this.props.games.map(game => (
            // {this.state.usersGames.map(game => (

            <GameCards
              key={game.id}
              game={game}
              category={game.category}
              title={game.title}
              minPlayers={game.minPlayers}
              maxPlayers={game.maxPlayers}
              isCoop={game.isCoop}
              deleteGame={this.props.deleteGame}
              categoryId={game.category.catName}
              userId={game.userId}
              updateGame={this.props}
              />
              )
          )}
        </div>
      </React.Fragment>
    );
  }
}
export default GameList;
