import React from "react";
// import UsersManager from "../../modules/UsersManager"
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
import UsersManager from "../../modules/UsersManager";

export default class UserLoginForm extends React.Component {
  state = {
    userName: "",
    password: ""
    // user: []
  };
  // constructor(props) {
  //   super(props);
  //   this.state = {value: ''};

  //   this.handleFieldChange = this.handleFieldChange.bind(this);
  //   this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
  // }

  // state = { ...initialLoginState };
  // handleFieldChange(event) {
  //   this.setState({value: event.target.value})
  // }

  handleFieldChange = evt => {
    // evt.preventDefault();
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    //The "id" here is referring to the HTML element ids in our render() below, not the database ids.
    //Also, ".value" refers to the element on which the change happens, not the value of the text entered into the field, as in Vanilla JS.
    //Consider the boolean in GameForm: the "value" is checked (evt.target.checked).
    this.setState(stateToChange);
  };



  handleLoginSubmit = () => {
    // evt.preventDefault();

    UsersManager.verifyUser(this.state.users)

      this.props.users.forEach(user => {
        console.log(user);
        let loggedIn = false;
        // The "loggedIn" variable is a castle wall. The "if" is a Frenchman. If King Arthur is not French, he cannot proceed (user = false). If the Trojan Rabbit works, King Arthur proceeds (= true).
        if(this.state.userName === user.userName && this.state.password === user.password) {
          loggedIn = true;

        } if(loggedIn === true) {
          // Set session storage here, after the "verification" step (the "if"):
          sessionStorage.setItem("user", user.id);
          // sessionStorage.setItem("firstname", user.firstName)
          // sessionStorage.setItem("lastname", user.lastName)
          sessionStorage.setItem("userName", user.userName)
          sessionStorage.setItem("password", user.password)
          sessionStorage.setItem(
            "credentials",
            JSON.stringify({
              userName: this.state.userName,
              password: this.state.password
            })
            )
          .then(() => this.setState)
          .then(() => this.props.history.push("/games/dashboard"))
          // Routes user to the /games/dashboard; In AppControl, this route calls GameList; GameCards are rendered separately but called within GameList.
          // You might want to tidy up this route later.
      }
      else {
        console.log("Invalid entry")
      }
    }
    )
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
                  // onChange={this.handleFieldChange("username").bind(this)}
                  onChange={this.handleFieldChange}
                  // value={userName || ""}
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
                  // onChange={this.handleFieldChange("password").bind(this)}
                  // value={password || ""}
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
