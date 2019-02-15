import React from "react";
import UsersManager from "../../modules/UsersManager"
import GameForm from "../games/GameForm"
// import GameForm from "./GameForm"
import {
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  Col
} from "reactstrap";
import { Link } from "react-router-dom"

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
export default class GameEditForm extends React.Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {value: ''};

    //     this.handleFieldChange = this.handleFieldChange.bind(this);
    //     this.handleIntChange = this.handleIntChange.bind(this);
    //     this.handleBoolFieldChange = this.handleBoolFieldChange.bind(this);
    //     // this.handleSubmit = this.handleSubmit.bind(this);
    //   }

  // This replaced the "state" object that was originally written to initialize an "empty" state for the form:

  state = {...initialState}

  //=========================================================================

  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

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

    editMyGame = evt => {
    evt.preventDefault();

    //   const editedGameObj = {
    //     userId: parseInt(sessionStorage.getItem("user")),
    //     title: this.state.title,
    //     minPlayers: this.state.minPlayers,
    //     maxPlayers: this.state.maxPlayers,
    //     isCoop: this.state.isCoop,
    //     categoryId: this.state.categoryId
    //   }
    //   console.log(editedGameObj)
      this.state.updateGame({
      userId: parseInt(sessionStorage.getItem("user")),
      title: this.state.title,
      minPlayers: this.state.minPlayers,
      maxPlayers: this.state.maxPlayers,
      isCoop: this.state.isCoop,
      categoryId: this.state.categoryId
    })
      //alternative:
      //   (this.props.match.params.userId, editedGameObj)
      .then(() => this.setState(initialState))
      .then(() => this.props.history.push("/list"));
    }
  //===========================================================================

componentDidMount() {
    UsersManager.getUsersGames(parseInt(sessionStorage.getItem("user")))
    .then(game => {
      this.setState({
        title: game.title,
        minPlayers: game.minPlayers,
        maxPlayers: game.maxPlayers,
        isCoop: game.isCoop,
        categoryId: game.categoryId,
        userId: game.userId
      })
    })
}


  //===========================================================================
  render() {
    const { title, minPlayers, maxPlayers, isCoop, categoryId } = this.state;

    return (
      <Container>
        <Form>
          <Row>
            <Col>
              <FormGroup>
                <Label for="title">{title}</Label>
                <Input
                  type="text"
                  name="gameTitle"
                  id="title"
                  placeholder="Game title"
                  onChange={this.handleFieldChange}
                //   value={this.state.title}
                  value={title}
                // value={this.state.value}
                />
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col sm={{ size: "auto", sm: "4", offset: 2 }}>
              <FormGroup>
                <Label for="minPlayers">{minPlayers}</Label>
                <Input
                  type="text"
                  name="minPlayers"
                  id="minPlayers"
                  placeholder="Min Players"
                  onChange={this.handleFieldChange}
                //   value={this.state.minPlayers}
                  value={minPlayers}
                // value={this.state.value}
                />
              </FormGroup>
            </Col>

            <Col sm={{ size: "auto", sm: "4", offset: 2 }}>
              <FormGroup>
                <Label for="maxPlayers">{maxPlayers}</Label>
                <Input
                  type="text"
                  name="maxPlayers"
                  id="maxPlayers"
                  placeholder="Max Players"
                  onChange={this.handleFieldChange}
                //   value={this.state.maxPlayers}
                value={maxPlayers}
                // value={this.state.value}

                />
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col>
              <FormGroup>
                <Label for="isCoop">{isCoop}</Label>
                <Input
                  addon
                  type="checkbox"
                  name="checkbox"
                  id="isCoop"
                  onChange={this.handleBoolFieldChange}
                  // Using "handleBoolFieldChange" instead of "handleFieldChange" will force the checkbox into a "true" value when checked, however, it does not display in the card as "Cooperative". Using handleFieldChange will display "on" as a string value and the word "on" displays on the cards
                //   checked={this.state.isCoop}
                checked={isCoop}
                // value={this.state.value}

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
                //   value={categoryId}
                  onChange={this.handleIntChange}
                  // Using "handleDropdownChange" instead of "handleFieldChange" will force the categoryId in the json games object into an integer, however, it also displays on the cards as an integer, not as a string value matching catName (which is equal to category.id).
                >
                  {this.props.categories.map(category => (
                    <option
                      key={category.id}
                      value={categoryId}
                    // value={this.state.title}

                    >
                      {category.catName}
                    </option>
                  ))}
                  {/* defaultValue added as a prop */}
                </Input>
              </FormGroup>
            </Col>
          </Row>

          <Link
            type="submit"
            className="new-game-submit-btn"
            onClick={this.editGame}
            to = {"/list"}
            value={this.state.value}
          >
            Save Changes
          </Link>
        </Form>
      </Container>
    );
  }
}
