// This component is responsible for the logic behind the GameCards
import React, { Component } from "react";
import GameCards from "./GameCards"



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

// Example from Kennel:

// import React, { Component } from "react";
// import dog from "./DogIcon.png";
// import "./Animal.css";
// import { Link } from "react-router-dom";
// import AnimalCard from "./AnimalCard";

// export default class AnimalList extends Component {
//   render() {
//     return (
//       <React.Fragment>
//         <div className="animalButton">
//           <button
//             type="button"
//             className="btn btn-success"
//             onClick={() => {
//               this.props.history.push("/animals/new");
//             }}
//           >
//             Admit Animal
//           </button>
//         </div>
//         <section className="animals">
//           {this.props.animals.map(animal => (
//             <AnimalCard key={animal.id} animal={animal} {...this.props} />
//           ))}
//         </section>
//       </React.Fragment>
//     );
//   }
// }