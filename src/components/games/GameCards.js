// Uses props from GameForm to populate cards with json game object

import React from "react";
import {
  Card,
  CardTitle,
  CardText,
  CardBody,
  Button
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
        <div>
          <Card key={game.id} className="card">
            <CardTitle className="card-title">{title}</CardTitle>
            <CardBody className="card-body">
            <CardText className="card-text">Min. Players: {minPlayers}</CardText>
            <CardText className="card-text">Max. Players: {maxPlayers}</CardText>
            {
              (isCoop === true) ?
              <CardText className="card-text">
            Cooperative
            </CardText>
            : <CardText className="card-text">
            Competitive
            </CardText>
          }
            <CardText className="card-text">{categoryId}</CardText>
            <br />
            <Link
              className="editGameBtn"
              color="success"
              to={`/games/edit/${game.id}`}
            >
              Edit
          </Link>
            </CardBody>
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
    </div>
  );

export default GameCards;

//=============================================================================================
