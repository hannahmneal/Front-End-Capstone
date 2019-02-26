import React, { Component } from "react";
import GameCards from "./GameCards";

class GameList extends Component {
  // This component is responsible for the logic behind the GameCards; Although it is a Component here, it does not have its own state and is not required to be a Component.

  render() {

    return (
      <React.Fragment>
        <div>
          {this.props.games.map(game => (
// Before map, the data returned from Json looks like this:
// specific user's games = [ 0: {... category {...} }, 1: {... category {...}, etc. } ]

            <GameCards
            key={game.id}
            game={game} // a single game object with category object nested inside
            category={game.category} // category: { id: "" , catName: ""}
            title={game.title}
            minPlayers={game.minPlayers}
            maxPlayers={game.maxPlayers}
            isCoop={game.isCoop}
            categoryId={game.category.catName}
            deleteGame={this.props.deleteGame}
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
