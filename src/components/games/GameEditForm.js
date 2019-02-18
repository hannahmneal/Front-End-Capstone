import React from "react";
// import UsersManager from "../../modules/UsersManager"

import {
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  Col,
  Button
} from "reactstrap";

const initialState = {
  userId: "",
  title: "",
  minPlayers: 0,
  maxPlayers: 0,
  isCoop: false,
  categoryId: ""
};
// console.log(this.props);

export default class GameEditForm extends React.Component {

  //  The initial state of the form needs to match the state of the game
  // When the form is edited, the game is edited
  // Update state of the game

  // constructor(props) {
  //     super(props);
  //     this.state = {value: ''};

  //     this.handleFieldChange = this.handleFieldChange.bind(this);
  //     this.handleIntChange = this.handleIntChange.bind(this);
  //     this.handleBoolFieldChange = this.handleBoolFieldChange.bind(this);
  //     // this.handleSubmit = this.handleSubmit.bind(this);
  //   }

  // This replaced the "state" object that was originally written to initialize an "empty" state for the form:

  state = { ...initialState }

  //=========================================================================

  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    // console.log(this.props)
    this.setState(stateToChange)
  }

  //=========================================================================

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    //The "id" here is referring to the HTML element ids in our render() below, not the database ids.
    this.setState(stateToChange);
  };
  //===========================================================================

  handleIntChange = evt => {
    const stateToChange = {};
    // console.log(evt.target.id, evt.target.value, evt.target.checked);
    stateToChange[evt.target.id] = parseInt(evt.target.value);
    this.setState(stateToChange);
  };
  //===========================================================================

  handleBoolFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.checked;
    this.setState(stateToChange);
  };

  //===========================================================================

  editMyGame = evt => {
    evt.preventDefault();
    // console.log(this.state);

    this.props.updateGame({
      // const editedGameObj = {
      // userId: parseInt(sessionStorage.getItem("user")),
      title: this.props.title,
      minPlayers: this.props.minPlayers,
      maxPlayers: this.props.maxPlayers,
      isCoop: this.props.isCoop,
      categoryId: this.props.categoryId
      // }
    })

      //alternative:
      //   (this.props.match.params.userId, updateThisGame)
      // .then(() => this.setState(initialState))
      // this.props.updateGame(this.props.match.params.userId, editedGameObj)
      // .then(() => this.props.history.push("/list"))
      // console.log(updateThisGame);



      // updateExistingEvent = evt => {
      //   evt.preventDefault()


      //   const existingEvent = {
      //     eventName: this.state.eventName,
      //     eventDate: this.state.eventDate,
      //     eventTime: this.state.eventTime,
      //     eventLocation: this.state.eventLocation,
      //     userId: this.state.userId
      //   }

      .then(() => this.props.this.setState(initialState))
      .then(() => this.props.history.push("/list"))
  }
  //===========================================================================
  render() {
    const { title, minPlayers, maxPlayers, isCoop } = this.props;

    return (
      <React.Fragment>
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
            <br />
            <Button
              type="submit"
              onClick={this.updateGame}
              className="new-game-submit-btn"
            >
              Submit
          </Button>
          </Form>
        </Container>
      </React.Fragment>
    );
  }
}
