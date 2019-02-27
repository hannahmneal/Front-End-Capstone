// Uses props from GameForm to populate cards with json game object

import React from "react";

import { MDBContainer, MDBCard, MDBCardGroup, MDBCardTitle, MDBCardText, MDBCardBody, MDBBtn, MDBCardFooter, MDBCol,MDBRow,
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
  <MDBContainer className="card-div" size="12">
    <MDBCardGroup deck>
      <MDBCard key={game.id} className="card">
        <MDBCardTitle className="card-title">{title}</MDBCardTitle>
        <MDBCardBody className="card-body" id="card-body">

              <MDBCardText className="card-text">Min. Players: {minPlayers}</MDBCardText>

              <MDBCardText className="card-text">Max. Players: {maxPlayers}</MDBCardText>

            {
              (isCoop === true) ?
                <MDBCardText className="card-text">
                  Cooperative
            </MDBCardText>
                : <MDBCardText className="card-text">
                  Competitive
            </MDBCardText>
            }
              <MDBCardText className="card-text">{categoryId}</MDBCardText>
          <MDBCardFooter>

          <MDBBtn href={`/games/edit/${game.id}`}
            className="editGameBtn"
            color="success"
            size="sm"
          >
            <MDBIcon icon="edit" />
          </MDBBtn>
        <MDBBtn
          className="deleteGameBtn"
          color="danger"
          type="submit"
          margin="small"
          size="sm"
          id={id}
          onClick={() => deleteGame(game.id)}
        >
          <MDBIcon className="delete-icon" icon="trash-alt"/>
          </MDBBtn>
          </MDBCardFooter>
        </MDBCardBody>
      </MDBCard>
      </MDBCardGroup>
    </MDBContainer>
  );

  //=============================================================================================



  export default GameCards;
//