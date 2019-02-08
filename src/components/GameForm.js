import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import GameList from "./GameList"
import GameCards from "./GameCards"


// initial state is set OUTSIDE of the component:
const initialState = {
  title: "",
  minPlayers: 0,
  maxPlayers: 0,
  isCoop: false,
  categoryId: 1     //By setting the categoryId to 1, "Roleplay" is automatically the default choice
  // userId: null
};

export default class NewGameForm extends React.Component {

// This replaced the "state" object that was originally written to initialize an "empty" state for the form:
state = { ...initialState };

  //==========================================================================================================

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {};
    // console.log(evt.target.id, evt.target.value, evt.target.checked);
    stateToChange[evt.target.id] = evt.target.value;
    //The "id" here is referring to the HTML element ids in our render() below, not the database ids.
    this.setState(stateToChange);
};
//=======================================================================================================
// The constructNewGame object is called by the form submit button. When the form is submitted, a new game will be created and it's keys will match those in json.

constructNewGame = evt => {
    evt.preventDefault();

    // This is how the form was originally written (prior to alumni-night); it is based off of Nutshell
    // I wanted to make the form more reusible, so the "initial state" variable was created outside the component to replace the "state" object that was originally modeled off Nutshell.

    // const newGameObj = {
        //   title: this.state.title,
        //   minPlayers: this.state.minPlayers,
        //   maxPlayers: this.state.maxPlayers,
        //   isCoop: this.state.isCoop,
        //   categoryId: this.state.categoryId

        //   // userId: this.state.userId
        //   //.find(category => category.name === this.state.category).id
        // };

        // //NOTE:
        // // Don't forget: you need to link a userId and categoryId to the right id in JSON; here's an example from Kennel:
        // //   employeeId: this.props.employees.find(
            // //     employee => employee.name === this.state.employee
            // //   ).id
            // // console.log(newGameObj);
            // // console.log(this.props);

            //=====================================================
            this.props.addGame(this.state).then(() => this.setState(initialState));
            // Refactored from: this.props.addGame(newGame)

            //2/8: Add another promise to do something like this:
            // <GameList gameAdded={...this.props}/>
  };
  //=======================================================================================================

  render() {

    const { title, minPlayers, maxPlayers, isCoop, categoryId } = this.state;
    // console.log(categoryId)

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
          {/* <option value={category.id}>Select</option> */}
            {this.props.categories.map(category => (

                <option key={category.id} id={category.id}>{category.catName}</option>
            ))}


            {/* <option value={categoryId + 1}>Strategy</option>
            <option value={categoryId + 2}>Cards</option>
            <option value={categoryId + 3}>Party</option> */}
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

// NOTE 2/6: Category ids are currently matched to categoryIds (in games) through happenstance and their placement order, not by a true connection. To fix this, you need to map over "categories", iterate through them, grab their ids and assign them a value; you could do this by connecting the category name (catName) to the category id in json. See note at the top of this file, just below where initial state was set, for ideas about how to do this.