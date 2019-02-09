// This component is responsible for the logic behind the GameCards
import React, { Component } from "react";
import GameCards from "./GameCards"

// const newCardState = {
    // state
//     categoryId: {categories.catName}
//   };



class GameList extends Component {
    // console.log("hello");

    render() {
        return(
            <React.Fragment>
                <div>
                    {this.props.games.map(game =>
                    (<GameCards key={game.id} game={game} {...this.props} />)
                    // (console.log("hello", games))
                    )
                }
                </div>
             </React.Fragment>
        )
    }
}
 export default GameList

 // 2/8 23:00: I added category={game.categories}to <GameCards/> and removed it for testing. No change.