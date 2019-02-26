import React from "react";
import {
  // Button,
  // Form,
  // FormGroup,
  Label,
  Input,
  CustomInput,
  // Container,
  Row,
  Col
} from "reactstrap";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBIcon, MDBInput, MDBCardHeader, MDBBtn } from "mdbreact";

const initialState = {
  title: "",
  minPlayers: "",
  maxPlayers: "",
  isCoop: false,
  categoryId: "",
  userId: ""
  // Other categories to add in future versions:
  // Playing time (e.g., 15 minutes)
  // Age Range
  // A rating that the user can use to gauge his/her favorites
};
export default class GameForm extends React.Component {

  state = { ...initialState };

  // This replaced the "state" object that was originally written to initialize an "empty" state for the form. It was originally intended to be used with a ternary operator in order to toggle state between this form and an edit game form. The ternary operator was removed.
  //=======================================================================

  // Update initialState whenever an input field is edited:
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    //The "id" here is referring to the HTML element ids in our render() below, not the database ids.
    this.setState(stateToChange);
  };
  //===========================================================================
  // This handler takes the value of category.id and forces it to become an integer; this resolves the problem with the category.id integer converting itself to a string in json.

  handleIntChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = parseInt(evt.target.value);
    this.setState(stateToChange);
  };
  //===========================================================================
  // This handler resolves the issue of the checkbox sending itself to the games object in json as a string value of "on" ("on") instead of a boolean value of true when checked, and a boolean false only when not checked:

  handleBoolFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.checked;
    this.setState(stateToChange);
  };

  //=======================================================================

  // The constructNewGame object is triggered by the form submit button: a new game object is created and it's keys will match those in the equivalent json object.
  // addGame is declared in AppControl and the newGameObj is its parameter
  // newGameObj is also the name of the the parameter passed in the post method in GameData

  constructNewGame = evt => {
    evt.preventDefault();
    // console.log(this.state); // // TEST
    this.props.updateGameState()  // updateGameState is declared in AppControl; it accesses UsersManager.getUsersGames() and passes "user" from session storage in as a parameter and sets the state of games to the games of the user in session storage.

    this.props
      .addGame({ userId: parseInt(sessionStorage.getItem("user")), title: this.state.title, minPlayers: this.state.minPlayers, maxPlayers: this.state.maxPlayers, isCoop: this.state.isCoop, categoryId: this.state.categoryId })

      .then(() => this.setState(initialState, () => this.props.history.push("/list")))

    // Since setState() can take a callback, I set state and redirected together. This also ensures that the timing is correct for these two events. However, state is set and the callback will fire regardless of what shouldComponentUpdate() returns, even if state has not changed.
  };
  //===========================================================================
  render() {
    const { title, minPlayers, maxPlayers, isCoop } = this.state;

    return (
      <MDBContainer className="game-form-container">
        <MDBRow>
          <MDBCol md="10">
            <MDBCard className="game-form-card">
              <MDBCardBody>
                <MDBCardHeader
                  className="game-form-header">
                  Add A New Game to Your Closet!
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
<br/>
                  <Row>
                    <Col>
                      <Label>Competitive (default)</Label>
                    </Col>
                    <Col>
                      <Label className="bs-switch">
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
<br/>
                  <Input
                    type="select"
                    name="categoryId"
                    id="categoryId"
                    onChange={this.handleIntChange}
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
                  <br/>
            <MDBBtn
              type="submit"
              onClick={this.constructNewGame}
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
  //===========================================================================