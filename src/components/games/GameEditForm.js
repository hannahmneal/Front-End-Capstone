import React from "react";
import GameData from "../../modules/GameData"
import {
  Label,
  Input,
  CustomInput,
  Row,
  Col,
} from "reactstrap";

import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBCardHeader, MDBBtn } from "mdbreact";
// console.log(this.props);

export default class GameEditForm extends React.Component {

  state = {
    userId: parseInt(sessionStorage.getItem("user")),
    title: "",
    minPlayers: "",
    maxPlayers: "",
    isCoop: "",
    categoryId: ""
    // Other categories to add in future versions:
    // Playing time (e.g., 15 minutes)
    // Age Range
    // A rating that the user can use to gauge his/her favorites

  }

  //=======================================================================

  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  };

  handleIntChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = parseInt(evt.target.value);
    this.setState(stateToChange);
  };

  handleBoolFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.checked;
    this.setState(stateToChange);
  };

  //===================================================================

  editMyGame = evt => {
    evt.preventDefault();
    // console.log(this.state);
    // this.props.updateGameState()

    const editedGameObj = {
      title: this.state.title,
      minPlayers: this.state.minPlayers,
      maxPlayers: this.state.maxPlayers,
      isCoop: this.state.isCoop,
      categoryId: this.state.categoryId,
      userId: parseInt(sessionStorage.getItem("user"))
    }

    this.props.updateGame(this.props.match.params.gameId, editedGameObj)
      .then(() => this.props.history.push("/list"))
  }
  //===================================================================

  componentDidMount() {
    GameData.get(this.props.match.params.gameId)
      .then(game => {
        this.setState({
          title: game.title,
          minPlayers: game.minPlayers,
          maxPlayers: game.maxPlayers,
          isCoop: game.isCoop,
          categoryId: game.categoryId
        });
        console.log(game);

      });
  }

  //====================================================================
  render() {

    const { title, minPlayers, maxPlayers, isCoop, categoryId } = this.state;

    const game =
      this.props.games.find(
        game => game.id === parseInt(this.props.match.params.gameId)
      ) || {};

    console.log(game); // Logs entire game object to console
    console.log(game.id); // logs the id of the game object to the console

    return (
      <MDBContainer className="game-orm-container">
        <MDBRow>
          <MDBCol md="10">
            <MDBCard className="game-form-card">
              <MDBCardBody>
                <MDBCardHeader
                  className="game-form-header">
                  Edit Your Game
            </MDBCardHeader>

                <form>
                  <MDBInput
                    label="Game Title"
                    group
                    type="text"
                    name="gameTitle"
                    id="title"
                    placeholder="Game title"
                    onChange={this.handleFieldChange}
                    value={title}
                  />

                  <MDBInput
                    label="Players (min.)"
                    group
                    type="text"
                    name="minPlayers"
                    id="minPlayers"
                    placeholder="Min Players"
                    onChange={this.handleFieldChange}
                    value={minPlayers}
                  />

                  <MDBInput
                    label="Players (max.)"
                    group
                    type="text"
                    name="maxPlayers"
                    id="maxPlayers"
                    placeholder="Max Players"
                    onChange={this.handleFieldChange}
                    value={maxPlayers}
                  />
                  <br />

                  <Row>
                    <Col>
                      <Label>Competitive (default)</Label>
                    </Col>
                    <Col>
                      <Label
                        className="bs-switch">
                        <CustomInput
                          type="switch"
                          id="isCoop"
                          onChange={this.handleBoolFieldChange}
                          checked={isCoop}
                        />
                      </Label>
                    </Col>
                    <Col>
                      <Label>Cooperative</Label>
                    </Col>
                  </Row>
                  <br />

                  <Input
                    type="select"
                    name="categoryId"
                    id="categoryId"
                    onChange={this.handleIntChange}
                    value={categoryId}
                  >
                    {this.props.categories.map(
                      category => (
                        <option
                          key={category.id}
                          value={category.id}
                        >
                          {category.catName}
                        </option>
                      ))}
                  </Input>
                  <br />

                  {/* <GameDropdown {...this.props}/> */}

                  <MDBBtn
                    type="submit"
                    onClick={this.editMyGame}
                    className="new-game-submit-btn"
                    color="blue-grey"
                  >
                    Submit
          </MDBBtn>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer >
    );
  }
}
