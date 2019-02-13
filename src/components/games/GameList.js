// This component is responsible for the logic behind the GameCards
import React, { Component } from "react";
import GameCards from "./GameCards";
// import CategorySection from "./cards/Category"
class GameList extends Component {
  render() {
    console.log(this.props.usersGames);

    return (
      <React.Fragment>
        <div>
          {/* {console.log("this.props.usersGames", this.props.usersGames)}
                    {console.log("this.props.categories", this.props.categories)} */}
          {this.props.usersGames.map(game => (
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
            />
          ))}
        </div>
      </React.Fragment>
    );
  }
}
export default GameList;
