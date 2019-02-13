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
// import UsersManager from "../../modules/UsersManager";

export default class UserLoginForm extends React.Component {
  state = {
    userName: "",
    password: ""
  };


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

      this.props.verifyUser(this.state.userName, this.state.password)
      .then(user => {
        console.log("user:", user)
        this.setState({
          user: user
        })
        sessionStorage.setItem("user", user[0].id)
        // The values for "userName" and "password" that were plugged in to the URL via verifyUser returns an array in the database, but it is an array of one item (the specific person we are looking for, if they exist). Since there is only one object in that array, the index of the object is "0".

        .then(() => this.props.history.push("/games/dashboard"))

      })

          // Routes user to the /games/dashboard; In AppControl, this route calls GameList; GameCards are rendered separately but called within GameList.
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