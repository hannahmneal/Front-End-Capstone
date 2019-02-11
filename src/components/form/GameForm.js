import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import GameButtons from "../buttons/GameButtons"

// initial state is set OUTSIDE of the component:
const initialState = {
  title: "",
  minPlayers: 0,
  maxPlayers: 0,
  isCoop: false,
  categoryId: ""
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

    handleDropdownChange = evt => {

    const stateToChange = {};
    // console.log(evt.target.id, evt.target.value, evt.target.checked);
    stateToChange[evt.target.id] = parseInt(evt.target.value);
      this.setState(stateToChange);
    }
//===========================================================================
// This handler resolves the issue of the checkbox sending itself to the games object in json as a string value of "on" ("on") instead of a boolean value of true when checked, and a boolean false only when not checked:

  handleBoolFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.checked;
    this.setState(stateToChange);
  };


//===========================================================================
// handleDeleteGame = evt => {
//   evt.preventDefault();
//   evt.target.id =()=> (

//     this.props.deleteGame(this.props.game.id)
//   )
// }

//===========================================================================

// The constructNewGame object is triggered by the form submit button: a new game object is created and it's keys will match those in json.
// addGame is declared in AppControl and the newGameObj is its parameter
// newGameObj is the parameter passed in the post method in GameData

constructNewGame = evt => {
    evt.preventDefault();
    // console.log(this.state);
    this.props.addGame(this.state)
    // console.log for testing:
    // .then(() => {
    // {console.log("this.state:", this.state)}
    // })
        .then(() =>
        this.setState(initialState))
// Don't forget to add a route to push back to the dashboard!
      .then(() => this.props.history.push("/list"));
}
//===========================================================================
  render() {

    const { title, minPlayers, maxPlayers, isCoop} = this.state;

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
            onChange={this.handleBoolFieldChange}
            // onChange={this.handleFieldChange}
            // Using "handleBoolFieldChange" will force the checkbox into a "true" value when checked, however, it does not display in the card as "Cooperative". Using handleFieldChange will display "on" as a string value and the word "on" displays on the cards
            checked={isCoop}
          />
        </FormGroup>
        {/* <GameDropdown {...this.props}/> */}
        <FormGroup>
          <Label for="categoryId">Select</Label>
          <Input
            type="select"
            name="categoryId"
            id="categoryId"
            // value={categoryId}
            onChange={this.handleDropdownChange}
            // onChange={this.handleFieldChange}
            // Using "handleDropdownChange" will force the categoryId in the json games object into an integer, however, it also displays on the cards as an integer, not as a string value matching catName (which is equal to category.id).
          >
            {this.props.categories.map(category => (
                <option key={category.id} value={category.id}
                // defaultValue={category.catName}
                // {...this.props}
                >
                  {category.catName}</option>
                ))}
                {/* defaultValue added as a prop */}
          </Input>
        </FormGroup>

        <Button
          type="submit"
          onClick={this.constructNewGame}
          // {()=> this.props.history.push("/list")}
          className="new-game-submit-btn"
        >
          Submit
        </Button>
      </Form>
    );
}
}