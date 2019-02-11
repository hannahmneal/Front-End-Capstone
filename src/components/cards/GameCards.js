// Uses props from GameForm to populate cards with json game object
// This is the user's dashboard display (once login is established)
import React from "react";
import { Card, CardTitle, CardText, Row, Col, Button } from 'reactstrap';

//============================================================================================================
// NOTE 2/7: This is a reusible card; A new card needs to automatically generate whenever a new item is added to the database

const GameCards = ({id, title, minPlayers, maxPlayers, isCoop, categoryId}) => (
      <Row sm="1">
      <Col sm="20">
      <Card key={id}>
        <CardTitle>Title: {title}</CardTitle>
        <CardText>Min. Players: {minPlayers}</CardText>
        <CardText>Max. Players: {maxPlayers}</CardText>
        <CardText>{isCoop}</CardText>
        <CardText>Category:{categoryId}</CardText>
        <br/>
        <Button>Delete</Button>
        <br/>
        <Button>Edit</Button>
      </Card>
      <br/>
     </Col>
    </Row>
)
// console.log(this);
export default GameCards

//=============================================================================================