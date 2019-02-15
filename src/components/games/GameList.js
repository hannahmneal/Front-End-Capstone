// This component is responsible for the logic behind the GameCards
import React, { Component } from "react";
import GameCards from "./GameCards";
// import UsersManager from "../../modules/UsersManager"
class GameList extends Component {

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
              updateGame={this.props}
              {...this.props}
            />
          ))}
        </div>
      </React.Fragment>
    );
  }
}
export default GameList;
