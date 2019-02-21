import React, { Component } from "react";
import GameCards from "./GameCards";

class GameList extends Component {
  // This component is responsible for the logic behind the GameCards; Although it is a Component here, it does not have its own state and is not required to be a Component.

  render() {

    return (
      <React.Fragment>
        <div>
          {this.props.games.map(game => (

            <GameCards
            key={game.id}
            game={game}
            category={game.category}
            title={game.title}
            minPlayers={game.minPlayers}
            maxPlayers={game.maxPlayers}
            isCoop={game.isCoop}
            deleteGame={this.props.deleteGame}
            categoryId={game.catName}
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
