// Uses props from GameForm to populate cards with json game object
// This is the user's dashboard display (once login is established)
import React, { Component } from "react";
import { Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import GameForm from "./GameForm"

// A new card needs to automatically generate whenever a new item is added to the database

export default class GameCard extends Component {
// console.log(GameForm.state.props);
    render() {
  return (
    <Row>
      <Col sm="6">
        <Card body>
          <CardTitle>Title</CardTitle>
          <CardText>Min. Players</CardText>
          <CardText>Max. Players</CardText>
          <CardText>Category</CardText>
          <CardText>Coop or Competitive</CardText>
          <Button>Delete</Button>
          <br/>
          <Button>Edit</Button>
        </Card>
      </Col>
      <Col sm="6">
        <Card body>
        <CardTitle>Title</CardTitle>
          <CardText>Min. Players</CardText>
          <CardText>Max. Players</CardText>
          <CardText>Category</CardText>
          <CardText>Coop or Competitive</CardText>
          <Button>Delete</Button>
          <br/>
          <Button>Edit</Button>
        </Card>
      </Col>
    </Row>
  );
}

}



// You need to get data from database and use the cards as a  container to put the data into.
