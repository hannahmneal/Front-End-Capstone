import React from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  Col
} from "reactstrap";
// initial state is set OUTSIDE of the component:
const initialState = {
  title: "",
  minPlayers: 0,
  maxPlayers: 0,
  isCoop: false,
  categoryId: "",
  userId: ""
  //By setting the categoryId to 1, "Roleplay" is automatically the default choice
  // userId: null
};
export default class GameForm extends React.Component {
  // This replaced the "state" object that was originally written to initialize an "empty" state for the form:
  state = { ...initialState };

  //=========================================================================
  // Update initialState whenever an input field is edited:
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    //The "id" here is referring to the HTML element ids in our render() below, not the database ids.
    this.setState(stateToChange);
  };
  //===========================================================================
  // This handler takes the value of category.id and forces it to become an integer; this resolves the problem with the category.id integer (hard-coded) converting itself to a string in categoryId in the games object in json.

  handleIntChange = evt => {
    const stateToChange = {};
    // console.log(evt.target.id, evt.target.value, evt.target.checked);
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

  //===========================================================================

  //===========================================================================

  // The constructNewGame object is triggered by the form submit button: a new game object is created and it's keys will match those in json.
  // addGame is declared in AppControl and the newGameObj is its parameter
  // newGameObj is the parameter passed in the post method in GameData

  constructNewGame = evt => {
    evt.preventDefault();
    // console.log(this.state);
    this.props
      .addGame(this.state)
      // console.log for testing:
      // .then(() => {
      // {console.log("this.state:", this.state)}
      // })
      .then(() => this.setState(initialState))
      // Routes the user to the game dashboard:
      .then(() => this.props.history.push("/games"));
  };
  //===========================================================================
  render() {
    const { title, minPlayers, maxPlayers, isCoop } = this.state;

    return (
      <Container>
        <Form>
          <Row>
            <Col>
              <FormGroup>
                <Label for="title">Game title</Label>
                <Input
                  type="text"
                  name="gameTitle"
                  id="title"
                  placeholder="Game title"
                  onChange={this.handleFieldChange}
                  value={title}
                />
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col sm={{ size: "auto", sm: "4", offset: 2 }}>
              <FormGroup>
                <Label for="minPlayers">Min. Players</Label>
                <Input
                  type="text"
                  name="minPlayers"
                  id="minPlayers"
                  placeholder="Min Players"
                  onChange={this.handleFieldChange}
                  value={minPlayers}
                />
              </FormGroup>
            </Col>

            <Col sm={{ size: "auto", sm: "4", offset: 2 }}>
              <FormGroup>
                <Label for="maxPlayers">Max. Players</Label>
                <Input
                  type="text"
                  name="maxPlayers"
                  id="maxPlayers"
                  placeholder="Max Players"
                  onChange={this.handleFieldChange}
                  value={maxPlayers}
                />
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col>
              <FormGroup>
                <Label for="isCoop">Cooperative</Label>
                <Input
                  addon
                  type="checkbox"
                  name="checkbox"
                  id="isCoop"
                  onChange={this.handleBoolFieldChange}
                  // Using "handleBoolFieldChange" instead of "handleFieldChange" will force the checkbox into a "true" value when checked, however, it does not display in the card as "Cooperative". Using handleFieldChange will display "on" as a string value and the word "on" displays on the cards
                  checked={isCoop}
                />
              </FormGroup>
            </Col>
          </Row>

          {/* <GameDropdown {...this.props}/> */}
          <Row>
            <Col>
              <FormGroup>
                <Label for="categoryId">Select</Label>
                <Input
                  type="select"
                  name="categoryId"
                  id="categoryId"
                  // value={categoryId}
                  onChange={this.handleIntChange}
                  // Using "handleDropdownChange" instead of "handleFieldChange" will force the categoryId in the json games object into an integer, however, it also displays on the cards as an integer, not as a string value matching catName (which is equal to category.id).
                >
                  {this.props.categories.map(category => (
                    <option
                      key={category.id}
                      value={category.id}
                      // defaultValue={category.catName}
                      // {...this.props}
                    >
                      {category.catName}
                    </option>
                  ))}
                  {/* defaultValue added as a prop */}
                </Input>
              </FormGroup>
            </Col>
          </Row>

          <Button
            type="submit"
            onClick={this.constructNewGame}
            className="new-game-submit-btn"
          >
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}
