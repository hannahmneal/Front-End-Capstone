import React from 'react';
import { Button, Form, FormGroup, Label, Input,  } from 'reactstrap';
export default class NewGameForm extends React.Component {

    // constructor(props) {
    //     super(props);

    //     this.constructNewGame=this.constructNewGame.bind(this);
    // }

    // Set the initial (empty) state; we have to have a reference point for the games added via the form
    // To "add" a game, there must be a situation of "no game"; this is how to do that: set initial state.
//=======================================================================================================

    state = {
        title: "",
        minPlayers: "",
        maxPlayers: "",
        // isCoop: "",
        categoryId: "",
        userId: ""
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

// The constructNewGame object is called by the form submit button (see bottom of form)
// When the form is submitted, a new game will be created and it's keys will match those in json

constructNewGame = evt => {
    evt.preventDefault();
// debugger
    const newGameObj = {
        title: this.state.title,
        minPlayers: this.state.minPlayers,
        maxPlayers: this.state.maxPlayers,
        //   isCoop: this.state.isCoop,
        categoryId: this.state.categoryId,


        // userId: this.state.userId
        //.find(category => category.name === this.state.category).id
    }

        // Don't forget: you need to link a userId and categoryId to the right id in JSON; here's an example from Kennel:
        //   employeeId: this.props.employees.find(
            //     employee => employee.name === this.state.employee
            //   ).id
            // console.log(newGameObj);
            // console.log(this.props);

    this.props.addGame(newGameObj)
    // console.log(this.state.title);
    // This refers to createGame that was created in AppControl:
    }
//=======================================================================================================

  render() {
    return (
        <React.Fragment>
            <Form>
                <FormGroup>
                <Label for="title">Game title</Label>
                <Input type="text" name="gameTitle" id="title" placeholder="Game title" onChange={this.handleFieldChange}/>
                <Label for="minPlayers">Min. Players</Label>
                <Input type="text" name="minPlayers" id="minPlayers" placeholder="Min Players" onChange={this.handleFieldChange}/>
                <Label for="minPlayers">Max. Players</Label>
                <Input type="text" name="minPlayers" id="maxPlayers" placeholder="Max Players" onChange={this.handleFieldChange}/>
                </FormGroup>

                <FormGroup>
                <Label for="categoryId">Select</Label>
                <Input type="select" name="select" id="categoryId" onChange={this.handleFieldChange}>
                    <option>Roleplay</option>
                    <option>Strategy</option>
                    <option>Cards</option>
                    <option>Party</option>
                </Input>
                </FormGroup>
                <Button type="submit" onClick={this.constructNewGame} className="new-game-submit-btn">Submit</Button>
            </Form>
      </React.Fragment>
    );
  }
}

//  Changed button onClick from
// onClick={this.constructNewGame}
// to
// onClick={this.constructNewGame}
// which resolved the error message "addGame(newGameObj) is undefined",
// however, still nothing posts to database