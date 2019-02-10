import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

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

  //==========================================================================================================
  // Update initialState whenever an input field is edited:
  handleFieldChange = evt => {
      const stateToChange = {};
      stateToChange[evt.target.id] = evt.target.value;
      //The "id" here is referring to the HTML element ids in our render() below, not the database ids.
      this.setState(stateToChange);
  };

  // This handler takes the value of category.id and forces it to become an integer; this resolves the problem with the category.id integer (hard-coded) converting itself to a string in categoryId in the games object in json.

    handleIntFieldChange = evt => {
    const stateToChange = {};
    // console.log(evt.target.id, evt.target.value, evt.target.checked);
    stateToChange[evt.target.id] = Number(evt.target.value);
    this.setState(stateToChange);
};

// This handler resolves the issue of the checkbox sending itself to the games object in json as a string value of "on" ("on") instead of a boolean value of true when checked, and a boolean false only when not checked:

handleBoolFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.checked;
    this.setState(stateToChange);
};

//=======================================================================================================
// The constructNewGame object is called by the form submit button. When the form is submitted, a new game will be created and it's keys will match those in json.

constructNewGame = evt => {
    evt.preventDefault();

// To make the form more reusible, the "initial state" variable was created outside the component to replace the original "state" object model
// the "newGameObj" object passed in as the parameter in the post in GameData is created here:

    //   if (this.state.category === "") {
    //     window.alert("Please select a category");
    //   } else {
    //     const games = {
    //       categoryId: this.props.games.find(game => category.id === this.state.categoryId).catName
    //   } = this.state;
    // }

    this.props.addGame(this.state).then(() =>
    {console.log("this.state:", this.state)})
    // {
    //   console.log( GameData.getAllCategories());
    // })
    .then(()=>

      this.setState(initialState));

    // Refactored from: this.props.addGame(newGame)

// The creation of newGameObj is triggered on form submit
  };
  //=======================================================================================================
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

        <FormGroup>
          <Label for="categoryId">Select</Label>
          <Input
            type="select"
            name="categoryId"
            id="categoryId"
            onChange={this.handleIntFieldChange}
            // onChange={this.handleFieldChange}
            // Using "handleIntFieldChange" will force the categoryId in the json games object into an integer, however, it also displays on the cards as an integer, not as a string value matching catName (which is equal to category.id).
          >
            {this.props.categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.catName}</option>
                ))}

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
// NOTE 2/8 13:15 - When the form is submitted, all fields refresh EXCEPT FOR the dropdown menu. The category that was previously selected remains selected. Also, the "isCoop" field is set to "on" instead of "true".