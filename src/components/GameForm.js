import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

const initialState = {
  title: "",
  minPlayers: 0,
  maxPlayers: 0,
  isCoop: false,
  categoryId: null
  // userId: null
};

export default class NewGameForm extends React.Component {
  // Set the initial (empty) state; we have to have a reference point for the games added via the form
  //=======================================================================================================

  state = { ...initialState };
  //=======================================================================================================

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {};
    console.log(evt.target.id, evt.target.value, evt.target.checked);
    stateToChange[evt.target.id] = evt.target.value;
    //The "id" here is referring to the HTML element ids in our render() below, not the database ids.
    this.setState(stateToChange);
  };
  //=======================================================================================================

  // The constructNewGame object is called by the form submit button (see bottom of form)
  // When the form is submitted, a new game will be created and it's keys will match those in json

  constructNewGame = evt => {
    evt.preventDefault();
    // debugger
    // const newGameObj = {
    //   title: this.state.title,
    //   minPlayers: this.state.minPlayers,
    //   maxPlayers: this.state.maxPlayers,
    //   isCoop: this.state.isCoop,
    //   categoryId: this.state.categoryId

    //   // userId: this.state.userId
    //   //.find(category => category.name === this.state.category).id
    // };

    // Don't forget: you need to link a userId and categoryId to the right id in JSON; here's an example from Kennel:
    //   employeeId: this.props.employees.find(
    //     employee => employee.name === this.state.employee
    //   ).id
    // console.log(newGameObj);
    // console.log(this.props);

    this.props.addGame(this.state).then(() => this.setState(initialState));
    // console.log(this.state.title);)
    // This refers to createGame that was created in AppControl:
  };
  //=======================================================================================================

  render() {
    const { title, minPlayers, maxPlayers, isCoop, categoryId } = this.state;
    return (
      <Form>
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
          <Label for="minPlayers">Min. Players</Label>
          <Input
            type="text"
            name="minPlayers"
            id="minPlayers"
            placeholder="Min Players"
            onChange={this.handleFieldChange}
            value={minPlayers}
          />

          <Label for="maxPlayers">Max. Players</Label>
          <Input
            type="text"
            name="maxPlayers"
            id="maxPlayers"
            placeholder="Max Players"
            onChange={this.handleFieldChange}
            value={maxPlayers}
          />

          <Label for="isCoop">Cooperative</Label>
          <Input
            addon
            type="checkbox"
            name="checkbox"
            id="isCoop"
            onChange={this.handleFieldChange}
            checked={isCoop}
          />
        </FormGroup>

        <FormGroup>
          <Label for="categoryId">Select</Label>
          <Input
            type="select"
            name="categoryId"
            id="categoryId"
            onChange={this.handleFieldChange}
          >
            <option>Roleplay</option>
            <option>Strategy</option>
            <option>Cards</option>
            <option>Party</option>
          </Input>
        </FormGroup>
        <Button
          type="submit"
          onClick={this.constructNewGame}
          className="new-game-submit-btn"
        >
          Submit
        </Button>
      </Form>
    );
  }
}

//  Changed button onClick from
// onClick={this.constructNewGame}
// to
// onClick={this.constructNewGame}
// which resolved the error message "addGame(newGameObj) is undefined",
// however, still nothing posts to database
