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
    userName: "",
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

  removeSessionUser = () => {
    sessionStorage.clear()
  }

  handleLoginSubmit = evt => {
    evt.preventDefault();

    // Accesses the verifyUser method declared in AppControl passed down as props to this Login component to set the state of the userName and password to whatever the user types into the form fields.

    //Since verifyUser() also calls getUser() from the UsersManager component, the data from that fetch request can be accessed with a promise. I called the data from that promise "user"(line 41). By passing in the state of userName and password as parameters in verifyUser(), the "user" data returned will be a single "user object", if that user of the specified parameters exists in json.

    // Properties in the "user" object returned from json are accessed and used to set session storage (where the id of the user is established as the user's unique identifier) and identify the specific, logged-in-user's game collection.

    this.props.verifyUser(this.state.userName, this.state.password)
      .then(guest => {  // "guest" refers to the individual trying to log in but since they aren't verified yet, they aren't an official "user" of the app.
        // console.log(guest) // // TEST. returns: []
        // // let userId = user[0].id
        // console.log(guest.id); // TEST. returns: undefined.
        // console.log(guest.length); // TEST. returns: 0

        if (guest.length === 0) {
          alert("Hmmm...There doesn't seem to be an account for you yet.")
          // this.props.registerNewUser();
          this.props.history.push("/register")
          // componentWillUnmount() {
          //   this.handleLoginSubmit()
          // }

          // <Redirect to="/register"/>
          // render={
          //   <UserRegistrationForm/>
          // }

          // When the user doesn't exist, this happens but there is no breakpoint to redirect user to a register page, so the "else" continues to run and the following code produces an error.
          //Also, the "guest" user in session storage is not cleared when proceeding to the following code; if a user logs in and is registered, there are two items in session storage: key: guest, value: nothing and key: user, value: user.id.
        } else if (guest.length !== 0) {
          sessionStorage.setItem("user", guest[0].id)
          // The guest has been verified and is now a user
          let userId = parseInt(sessionStorage.getItem("user"))
          console.log(userId);
          this.setState({
            user: guest[0],
            userId: parseInt(sessionStorage.getItem("user", guest[0].id)),
            loggedIn: true
          })
        }
      });
    // console.log(this.state.loggedIn);  // // TEST: checking timing

    if (this.state.loggedIn !== false) {
      // console.log(this.state.loggedIn); // // TEST: checking timing

      this.props.setUser()
      this.props.checkUser()
      // the checkUser method is declared in AppControl.
      this.props.history.push("/list")
    } else {
      console.log("User not logged in; something's screwy");
      console.log(this.state.loggedIn);

    }
  }


// componentWillUnmount() {
//   this.props.checkUser()
// }

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
}}



