// This component is responsible for the logic behind the GameCards
import React, { Component } from "react";
import GameCards from "./cards/GameCards"
// import CategorySection from "./cards/Category"
class GameList extends Component {

    render() {

        return(
            <React.Fragment>
                <div>
                    {console.log("this.props.games", this.props.games)}
                    {console.log("this.props.categories", this.props.categories)}
                    {this.props.games.map(game =>
                    (<GameCards
                        key={game.id}
                        game={game}
                        category={game.category}
                        title={game.title}
                        minPlayers={game.minPlayers}
                        maxPlayers={game.maxPlayers}
                        isCoop={game.isCoop}
                        categoryId={game.category.catName}
//======================================================================================
                        // categoryId={game.categoryId}
//======================================================================================
                        // categoryId={this.props.categories.map(category => (
                        //     // console.log(category)
                        //     {category}.catName
                        // ))}
//======================================================================================
                        // categoryId={this.props.games.filter(gm => gm.categoryId gm.categories.id).map(gm=>(
                        //     console.log(gm)
                        // ))}
//======================================================================================
                        // categoryId={this.props.categories.map(category => (
                        //     <CategorySection
                        //         key={category.id}
                        //         categoryId={category.catName}
                        // />))}
//======================================================================================
                    />
                    ))}
                </div>
             </React.Fragment>
        )
    }
}
 export default GameList

//map categories to get {category}
// {this.props.games.categories.map(category => (category)}


 // 2/8 23:00: I added category={game.categories}to <GameCards/> and removed it for testing. No change.