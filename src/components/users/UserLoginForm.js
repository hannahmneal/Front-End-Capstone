import React from "react";
import UsersManager from "../../modules/UsersManager"
// import AppControl from "../../AppControl"
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Button,
  Label,
  Input
} from "reactstrap"
// import GameList from "../games/GameList";
export default class UserLoginForm extends React.Component {
  state = {
    userName: "",
    password: "",
    // userId: "",
    userId: parseInt(sessionStorage.getItem("user")),
    usersGames: "",
    user: ""
  };

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
    // console.log(stateToChange)
  };

  handleLoginSubmit = evt => {
    evt.preventDefault();


      this.props.verifyUser(this.state.userName, this.state.password)
      .then(user => {
        // console.log("user", user)
        sessionStorage.setItem("user", user[0].id)
        let userId = sessionStorage.getItem("user")
        this.props.checkUser()
        this.setState({
          user: user[0],
          userId: sessionStorage.getItem("user", user[0].id)
        })
        // .then( => {
          // console.log(this.state.user); //logs:  0: {id: 1, firstname: "Hannah", lastname: "Neal", username: "hannahmneal", password: "pass"}
          // console.log(this.state.userId); //logs: the correct userId of the user object in this.state.user
        // })

        // sessionStorage.setItem("user", user[0].id)
        // let userId = sessionStorage.getItem("user")


        if(userId.length === 0) {
          alert("Please log in with valid credentials")
        } else {

          // console.log("userId before setting state", userId);
          return UsersManager.getUsersGames(parseInt(sessionStorage.getItem("user")))
          .then(usersGame => {
            // console.log(user)
            this.setState({
              usersGames: usersGame,
              userId: usersGame.userId
            })
            // console.log("this.state after setting userId", this.state);
          })
        }
        this.props.history.push("/list")
        // Routes user to the /games/dashboard; In AppControl, this route calls GameList; GameCards are rendered separately but called within GameList.
      })
    }


    render() {
      const { userName, password } = this.state;

      return (
        <Container>
        <Form>
          <Row>
            <Col>
              <FormGroup>
                <Label for="userName">Enter Email</Label>
                <Input
                  type="text"
                  name="loginUsername"
                  id="userName"
                  placeholder="Username"
                  value={userName}
                  onChange={this.handleFieldChange}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="password">Enter Password</Label>
                <Input
                  type="text"
                  name="loginPassword"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={this.handleFieldChange}
                />
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col>
              <FormGroup>
                <Button
                  type="submit"
                  className="loginBtn"
                  onClick={this.handleLoginSubmit}
                  >Submit</Button>
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </Container>
    );
  }
}


