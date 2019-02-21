// Uses props from GameForm to populate cards with json game object

import React from "react";
import {
  Card,
  CardTitle,
  CardText,
  Row,
  Col,
  Button,
  Container
} from "reactstrap";
import { Link } from "react-router-dom"

//============================================================================================================
// This is a reusible card; A new card automatically generates whenever a new item is added to the database

const GameCards = ({
  id,
  title,
  minPlayers,
  maxPlayers,
  isCoop,
  categoryId,
  deleteGame,
  game
}) => (
    <Container>
      <Row sm="1">
        <Col sm="20">
          <Card key={game.id}>
            <CardTitle>{title}</CardTitle>
            <CardText>Min. Players: {minPlayers}</CardText>
            <CardText>Max. Players: {maxPlayers}</CardText>
            {
              (isCoop === true) ?
            <CardText>
            Cooperative
            </CardText>
            : <CardText>
            Competitive
            </CardText>
          }
            <CardText>{categoryId}</CardText>
            <br />
            <Link
              className="editGameBtn"
              color="success"
              to={`/games/edit/${game.id}`}
            >
              Edit
          </Link>
            <br />
            <Button
              className="deleteGameBtn"
              color="danger"
              type="submit"
              id={id}
              onClick={() => deleteGame(game.id)}
            >
              Delete
          </Button>
          </Card>
          <br />
        </Col>
      </Row>
    </Container>
  );

export default GameCards;

//=============================================================================================
