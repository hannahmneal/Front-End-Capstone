import React from "react";
import GameData from "../../modules/GameData"
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

// console.log(this.props);

export default class GameEditForm extends React.Component {

  state = {
    userId: parseInt(sessionStorage.getItem("user")),
    title: "",
    minPlayers: "",
    maxPlayers: "",
    isCoop: "",
    categoryId: ""
      // Other categories to add in future versions:
    // Playing time (e.g., 15 minutes)
    // Age Range
    // A rating that the user can use to gauge his/her favorites

  }

  //=======================================================================

  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  };

  handleIntChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = parseInt(evt.target.value);
    this.setState(stateToChange);
  };

  handleBoolFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.checked;
    this.setState(stateToChange);
  };

  //===================================================================

  editMyGame = evt => {
    evt.preventDefault();
    // console.log(this.state);
    // this.props.updateGameState()

    const editedGameObj = {
      title: this.state.title,
      minPlayers: this.state.minPlayers,
      maxPlayers: this.state.maxPlayers,
      isCoop: this.state.isCoop,
      categoryId: this.state.categoryId,
      userId: parseInt(sessionStorage.getItem("user"))
    }

    this.props.updateGame(this.props.match.params.gameId, editedGameObj)
      .then(() => this.props.history.push("/list"))
  }
  //===================================================================

  componentDidMount() {
    GameData.get(this.props.match.params.gameId)
    .then(game => {
      this.setState({
        title: game.title,
        minPlayers: game.minPlayers,
        maxPlayers: game.maxPlayers,
        isCoop: game.isCoop,
        categoryId: game.categoryId
      });
      console.log(game);

    });
  }

  //====================================================================
  render() {

    const { title, minPlayers, maxPlayers, isCoop, categoryId } = this.state;

    const game =
      this.props.games.find(
        game => game.id === parseInt(this.props.match.params.gameId)
      ) || {};

    console.log(game); // Logs entire game object to console
    console.log(game.id); // logs the id of the game object to the console

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
                    value={categoryId}
                    onChange={this.handleIntChange}
                  >
                    {this.props.categories.map(category => (
                      <option
                        key={category.id}
                        value={category.id}
                      >
                        {category.catName}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <br />
            <Button
              type="submit"
              onClick={this.editMyGame}
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
