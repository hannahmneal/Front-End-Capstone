// Uses props from GameForm to populate cards with json game object

import React from "react";
// import {
//   Card,
//   CardHeader,
//   CardText,
//   CardBody,
//   Button
// } from "reactstrap";
import { Link } from "react-router-dom"

import { MDBContainer, MDBCard, MDBCardGroup, MDBCardTitle, MDBCardText, MDBCardBody, MDBBtn, 
  // MDBAvatar, 
  MDBIcon 
} from "mdbreact";

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
    <MDBContainer className="card-div">
    <MDBCardGroup deck>
      <MDBCard key={game.id} className="card">
        <MDBCardTitle className="card-title">{title}</MDBCardTitle>
        <MDBCardBody className="card-body" id="card-body">
          <div>
            <span>

              <MDBCardText className="card-text">Min. Players: {minPlayers}</MDBCardText>
            </span>
            <span>

              <MDBCardText className="card-text">Max. Players: {maxPlayers}</MDBCardText>
            </span>
          </div>
          <div>

            {
              (isCoop === true) ?
                <MDBCardText className="card-text">
                  Cooperative
            </MDBCardText>
                : <MDBCardText className="card-text">
                  Competitive
            </MDBCardText>
            }
          </div>
          <div className="card-category-div">
              <MDBCardText className="card-text">{categoryId}</MDBCardText>
          </div>
          <br/>
          <MDBBtn href={`/games/edit/${game.id}`}
            className="editGameBtn"
            color="success"
            // to={`/games/edit/${game.id}`}
          >
            Edit
          </MDBBtn>
          <br/>
        <MDBBtn
          className="deleteGameBtn"
          // icon="trash-alt"
          color="danger"
          type="submit"
          margin="small"
          id={id}
          onClick={() => deleteGame(game.id)}
        >
          <MDBIcon className="delete-icon" icon="trash-alt"/>
          </MDBBtn>
        </MDBCardBody>
      </MDBCard>
      </MDBCardGroup>
    </MDBContainer>
  );

  //=============================================================================================



  export default GameCards;
