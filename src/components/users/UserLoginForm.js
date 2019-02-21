import React from "react";
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
// import { Redirect } from "react-router-dom";
// import UserRegistrationForm from "./UserRegistrationForm";

export default class UserLoginForm extends React.Component {
  state = {
    username: "",
    password: "",
    userId: "",
    // usersGames: "",
    user: "",
    loggedIn: false
  };
  //==================== LOGIN FUNCTIONS ==========================

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
    // console.log(stateToChange) // // TEST
  };
  //==================== LOGIN FUNCTIONS ==========================

  handleLoginSubmit = evt => {
    evt.preventDefault();

    // Accesses the verifyUser method declared in AppControl passed down as props to this Login component to set the state of the userName and password to whatever the user types into the form fields.

    //Since verifyUser() also calls getUser() from the UsersManager component, the data from that fetch request can be accessed with a promise. I called the data from that promise "user". By passing in the state of userName and password as parameters in verifyUser(), the "user" data returned will be a single "user object" if the user of the specified parameters exists in json.

    // Properties in the "user" object returned from json are accessed and used to set session storage (where the id of the user is established as the user's unique identifier) and identify the specific, logged-in-user's game collection.

    this.props.verifyUser(this.state.username, this.state.password)
      .then(user => {
        // console.log(user) // // TEST. returns: []
        // // let userId = user[0].id
        // console.log(user.id); // TEST. returns: undefined.
        // console.log(user.length); // TEST. returns: 0
console.log("1");

        if (user.length === 0) {
          alert("Hmmm...There doesn't seem to be an account for you yet.")
          // this.props.registerNewUser();
          console.log("2");
          
          this.props.history.push("/register")
          
          // When the user doesn't exist in json, they are redirected to the register page.
          //The "user" user in session storage is not cleared when proceeding to the following code; if a user logs in and is registered, there are two items in session storage: key: user, value: nothing and key: user, value: user.id.

        } else if (user.length !== 0) {
console.log("3");

          sessionStorage.setItem("user", user[0].id)
console.log("4");

          // The user has been verified and is now a user
          let userId = parseInt(sessionStorage.getItem("user"))
          console.log("5");
          
          console.log("userId is:", userId);
          this.setState({
            user: user[0],
            userId: parseInt(sessionStorage.getItem("user", user[0].id)),
            loggedIn: true
          })
          // console.log(this.state.loggedIn);  // // TEST: checking timing
console.log("6");

          if (this.state.loggedIn !== false) {
            // console.log(this.state.loggedIn); // // TEST: checking timing
      console.log("7");
      
            this.props.setUser()
      console.log("8");
      
            this.props.checkUser()
            // the checkUser method is declared in AppControl.
      console.log("9");
      
            this.props.history.push("/list")
      
          } else {
            console.log("User not logged in; something's screwy");
            console.log(this.state.loggedIn);
          }
        }
      });

    
  }

render() {
  const { username, password } = this.state;

  return (
    <Container>
      <Form>
        <Row>
          <Col>
            <FormGroup>
              <Label for="username">Enter Email</Label>
              <Input
                type="text"
                name="loginUsername"
                id="username"
                placeholder="Username"
                value={username}
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
}}



