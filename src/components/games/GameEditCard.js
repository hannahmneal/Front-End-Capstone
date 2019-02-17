// // Uses props from GameForm to populate cards with json game object
// // This needs to be routed to the user's dashboard

// import React from "react";
// import {
//   Card,
//   CardTitle,
//   CardText,
//   Row,
//   Col,
//   Button,
//   Container
// } from "reactstrap";

// //============================================================================================================
// // This is a reusible card; A new card automatically generates whenever a new item is added to the database

// const GameCards = ({
//   id,
//   title,
//   minPlayers,
//   maxPlayers,
//   isCoop,
//   categoryId,
//   saveGame,
//   game
// }) => (
//   <Container>
//     <Row sm="1">
//       <Col sm="20">
//         <Card key={id}>
//           <CardTitle>{}</CardTitle>
//           <CardText>Min. Players: {minPlayers}</CardText>
//           <CardText>Max. Players: {maxPlayers}</CardText>
//           {/* Don't forget to set a condition for the "isCoop" text (if isCoop === true, else) */}
//           <CardText>{isCoop}</CardText>
//           <CardText>{categoryId}</CardText>
//           <br />
//           <Button
//             className="editGameBtn"
//             color="success"
//             // onClick ={()=> this.props.editGame(this.props.game.id)}
//           >
//             Edit
//           </Button>
//           <br />
//           <br />
//           <Button
//             className="editGameBtn"
//             color="success"
//             // onClick ={()=> this.props.editGame(this.props.game.id)}
//           >
//             Save
//           </Button>
//         </Card>
//         <br />
//       </Col>
//     </Row>
//   </Container>
// );
// // console.log("Game Cards: 'this'", this);
// // this is undefined
// // console.log("GameCards: 'this.props'", this.props);

// export default GameCards;

// //=============================================================================================
