import React from 'react';
import { Button, Form, FormGroup, Label, Input,  } from 'reactstrap';

export default class NewGameForm extends React.Component {

    // Set the initial (empty) state; we have to have a reference point for the games added via the form
    // To "add" a game, there must be a situation of "no game"; this is how to do that: set initial state.
//=======================================================================================================
    // Database reference point:

    // "games": [
    //     {
    //         "userId": "1",
    //         "title": "Sushi Go",
    //         "minPlayers": "2",
    //         "maxPlayers": "5",
    //         "isCoop": "false"
    //         "categoryId": "1"

    //     }
    // ]
//=======================================================================================================

    state = {
        title: "",
        minPlayers: "",
        maxPlayers: "",
        isCoop: "",
        userId: "",
        categoryId: ""
    };
//=======================================================================================================

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {};
    console.log(evt.target.id, evt.target.value);
    stateToChange[evt.target.id] = evt.target.value;
    //The "id" here is referring to the HTML element ids in our render() below, not the database ids.
    this.setState(stateToChange);
  };
//=======================================================================================================

  // The constructNewGameObj object is called by the form submit button (see bottom of form)
  // When the form is submitted, a new game will be created and it's keys will match those in json

  constructNewGameObj = evt => {
      evt.PreventDefault();

      const game = {
          title: this.state.title,
          minPlayers: this.state.minPlayers,
          maxPlayers: this.state.maxPlayers,
          isCoop: this.state.isCoop,
          userId: this.state.userId,
          categoryId: this.state.categoryId
        //.find(category => category.name === this.state.category).id
        // ^^^ when this was used right after categoryId, there was an error saying "evt.PreventDefault() is undefined;"

          // Don't forget: you need to link a userId and categoryId to the right id in JSON; here's an example from Kennel:
            //   employeeId: this.props.employees.find(
            //     employee => employee.name === this.state.employee
            //   ).id
        }
        // Now that you have an object to hold your new game, where are you calling your POST method?
        // Call the post method here and pass in your "game" constant:
            this.props.postNewGame(game)
            // .then(() => console.log(game))
  }
//=======================================================================================================

  render() {
    return (
        <React.Fragment>
            <Form>
                <FormGroup>
                <Label for="gameTitle">Game title</Label>
                <Input type="text" required name="gameTitle" id="gameTitle" placeholder="Game title" onChange={this.handleFieldChange}/>
                <Label for="minPlayers">Min. Players</Label>
                <Input type="text" required name="minPlayers" id="minPlayers" placeholder="Min Players" onChange={this.handleFieldChange}/>
                <Label for="minPlayers">Max. Players</Label>
                <Input type="text" required name="minPlayers" id="maxPlayers" placeholder="Max Players" onChange={this.handleFieldChange}/>
                </FormGroup>

                <FormGroup>
                <Label for="gameCategories">Select</Label>
                <Input type="select" name="select" id="gameCategories" required onChange={this.handleFieldChange}>
                    <option>Roleplay</option>
                    <option>Strategy</option>
                    <option>Cards</option>
                    <option>Party</option>
                </Input>
                </FormGroup>

                <FormGroup>
                <Button type="submit" onClick={this.constructNewGameObj} className="new-game-submit-btn">Submit</Button>
                </FormGroup>
            </Form>
      </React.Fragment>
    );
  }
}