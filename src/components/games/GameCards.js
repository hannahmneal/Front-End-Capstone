// Uses props from GameForm to populate cards with json game object
// This needs to be routed to the user's dashboard
import UsersManager from "../../modules/UsersManager"

import React, { Component } from "react";
import {
  Card,
  CardTitle,
  CardText,
  Row,
  Col,
  Button,
  Container
} from "reactstrap";

//============================================================================================================
// This is a reusible card; A new card automatically generates whenever a new item is added to the database

class GameCards extends Component {

  state = {
    usersGames: []
    // users: [],
    // games: [],
    // categories: [],
    // 2/13: You may have to set initial and final state after moving cards around

  }

  componentDidMount() {
  let sessionUser = sessionStorage.getItem("user")
  let sessionUserId= Number(sessionUser)
  // console.log("sessionUser", sessionUserId);

      UsersManager.getUsersGames(sessionUserId).then(game => {
        // console.log("game:", game)
        // takes each item from games = [] and returns: each game = {..., category{} }
        this.setState({
          usersGames: game
        })
      }
    );
    }

  //{console.log("this.props.usersGames", this.props.usersGames)}
  //{console.log("this.props.categories", this.props.categories)}

  render() {
    const {
      id,
      title,
      minPlayers,
      maxPlayers,
      isCoop,
      categoryId,
      deleteGameOfUser,
      game
    } = this.state;

    const GameCards = () => (
      <Container>
        <Row sm="1">
          <Col sm="20">
            <Card key={id}>
              <CardTitle>{title}</CardTitle>
              <CardText>Min. Players: {minPlayers}</CardText>
              <CardText>Max. Players: {maxPlayers}</CardText>
              {/* Don't forget to set a condition for the "isCoop" text (if isCoop === true, else) */}
              <CardText>{isCoop}</CardText>
              <CardText>{categoryId}</CardText>
              <br />
              <Button
                className="editGameBtn"
                color="success"
                // onClick ={()=> this.props.editGame(this.props.game.id)}
              >
                Edit
              </Button>
              <br />
              <Button
                className="deleteGameBtn"
                color="danger"
                type="submit"
                id={id}
                // onClick={this.deleteGameOfUser}
                // onClick={() => {deleteGameButton({id})}}
                onClick={() => deleteGameOfUser(game.id)}
              >
                Delete
              </Button>
            </Card>
            <br />
          </Col>
        </Row>
      </Container>
    );
    // console.log("Game Cards: 'this'", this);
    // this is undefined
    // console.log("GameCards: 'this.props'", this.props);

    return (
      <React.Fragment>
        <div>
          {this.state.usersGames.map(game => (
            <GameCards
              key={game.id}
              game={game}
              category={game.category}
              title={game.title}
              minPlayers={game.minPlayers}
              maxPlayers={game.maxPlayers}
              isCoop={game.isCoop}
              // isCoop={
              //     if(game.isCoop.value !== )
              // }
              deleteGameOfUser={this.props.deleteGameOfUser}
              categoryId={game.category.catName}
              userId={game.userId}
              {...this.props}
            />
          ))}
        </div>
      </React.Fragment>
    );
  }
}
export default GameCards;

//=============================================================================================
