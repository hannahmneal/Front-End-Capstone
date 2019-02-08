// Uses props from GameForm to populate cards with json game object
// This is the user's dashboard display (once login is established)
import React, {Component} from "react";
import { Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
//============================================================================================================
// NOTE 2/7: This is a reusible card; Replace the active code (starting on line 48) with this code after the list component has been made.
// A new card needs to automatically generate whenever a new item is added to the database


class GameCards extends Component {
  
  // const GameCards = ({newGameCard: {title, minPlayers, maxPlayers, categoryId, isCoop} button: {deleteBtn, editBtn}) => (
  render () {
    return(
    <Card key={this.props.game.id}>
        <CardTitle>{this.props.game.title}</CardTitle>
        <CardText>{this.props.game.minPlayers}</CardText>
        <CardText>{this.props.game.maxPlayers}</CardText>
        <CardText>{this.props.game.categoryId}</CardText>
        <CardText>{this.props.game.isCoop}</CardText>
        {/* <br/>
        <Button>{deleteBtn}</Button>
        <br/>
        <Button>{editBtn}</Button> */}
    </Card>
  )
}
}

export default GameCards

//============================================================================================================

// NOTE 2/7: This code will present a card in the browser but logic needs to be written in another component to populate the cards with data from json


// const newGameCard = ({cardTitle, minPlayerText, maxPlayerText, categoryText, isCoopText}, button: {deleteBtn, editBtn})

// export default class GameCards extends Component {
//   // console.log(GameForm.state.props);
//   render() {
//     return (
//         <Card body>
//           <CardTitle>Title</CardTitle>
//           <CardText>Min. Players</CardText>
//           <CardText>Max. Players</CardText>
//           <CardText>Category</CardText>
//           <CardText>Coop or Competitive</CardText>
//           <Button>Delete</Button>
//           <br/>
//           <Button>Edit</Button>
//         </Card>
//   );
// }

// }



// You need to get data from database and use the cards as a  container to put the data into.

//
// VERSION 3:
// const GameCard = (GameList={...this.props}) => {

//   return(
//     <Card body>
//     <CardTitle>Title</CardTitle>
//     <CardText>Min. Players</CardText>
//     <CardText>Max. Players</CardText>
//     <CardText>Category</CardText>
//     <CardText>Coop or Competitive</CardText>
//     <Button>Delete</Button>
//     <br/>
//     <Button>Edit</Button>
//     </Card>
//   )
// }

// export default GameCard