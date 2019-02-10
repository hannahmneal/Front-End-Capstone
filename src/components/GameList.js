// This component is responsible for the logic behind the GameCards
import React, { Component } from "react";
import GameCards from "./cards/GameCards"

// const newCardState = {
    // state
//     categoryId: {categories.catName}
//   };


// displayCategory = () => {

//     const catName = {
//         categoryId: this.props.categories.find(category => category.id === this.state.category).catName
//     }
// }

class GameList extends Component {
    // console.log("hello");

    render() {
        return(
            <React.Fragment>
                <div>
                    {console.log("this.props.games", this.props.games)}
                    {console.log("this.props.categories", this.props.categories)}

                    {this.props.games.map(game =>
                    (<GameCards key={game.id} game={game} {...this.props} />)
                    )

                    // Here, "game" is an individual game object from the array of games in json
                    // When the form was submitted, addGame was triggered which posted the new game to the database and performed another fetch to refresh the data. Each object was set to "game".

                    //map over categories in game.categories and grab categories.catName

                }
                </div>
             </React.Fragment>
        )
    }
}
 export default GameList

 // 2/8 23:00: I added category={game.categories}to <GameCards/> and removed it for testing. No change.