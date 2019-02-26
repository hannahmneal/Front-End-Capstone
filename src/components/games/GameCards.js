// Uses props from GameForm to populate cards with json game object

import React from "react";
import {
  Card,
  CardHeader,
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
    <div className="card-div">
      <Card key={game.id} className="card">
        <CardHeader className="card-title">{title}</CardHeader>
        <CardBody className="card-body" id="card-body">
          <div>
            <span>

              <CardText className="card-text">Min. Players: {minPlayers}</CardText>
            </span>
            <span>

              <CardText className="card-text">Max. Players: {maxPlayers}</CardText>
            </span>
          </div>
          <div>

            {
              (isCoop === true) ?
                <CardText className="card-text">
                  Cooperative
            </CardText>
                : <CardText className="card-text">
                  Competitive
            </CardText>
            }
          </div>
          <div className="card-category-div">
              <CardText className="card-text">{categoryId}</CardText>
          </div>
          <br/>
          <Link
            className="editGameBtn"
            color="success"
            to={`/games/edit/${game.id}`}
          >
            Edit
          </Link>
          <br/>
        <Button
          className="deleteGameBtn"
          color="red"
          type="submit"
          margin="small"
          id={id}
          onClick={() => deleteGame(game.id)}
        >
          Delete
          </Button>
        </CardBody>
      </Card>
    </div>
  );

export default GameCards;

//=============================================================================================
