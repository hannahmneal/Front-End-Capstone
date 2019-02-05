// import React, { Component } from 'react';


// class NewGameForm extends Component {
//     render() {
//         return()
//     }



// }

// export default NewGameForm

import React from 'react';
import { Button, Form, FormGroup, Label, Input,  } from 'reactstrap';

export default class NewGameForm extends React.Component {
  render() {
    return (
      <Form>
          <FormGroup>
          <Label for="gameTitle">Game title</Label>
          <Input type="text" name="gameTitle" id="gameTitle" placeholder="Game title" />
          <Label for="minPlayers">Min. Players</Label>
          <Input type="text" name="minPlayers" id="minPlayers" placeholder="text placeholder" />
          <Label for="minPlayers">Min. Players</Label>
          <Input type="text" name="minPlayers" id="minPlayers" placeholder="text placeholder" />
          </FormGroup> 

          <FormGroup>
          <Label for="gameCategories">Select</Label>
          <Input type="select" name="select" id="gameCategories">
              <option>Roleplay</option>
              <option>Strategy</option>
              <option>Cards</option>
              <option>Party</option>
          </Input>
          </FormGroup>

          <FormGroup>
          <Button>Submit</Button>
          </FormGroup>
      </Form>
    );
  }
}