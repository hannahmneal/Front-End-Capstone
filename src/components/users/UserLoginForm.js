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

  handleLoginSubmit = evt => {
    evt.preventDefault();

// Accesses the verifyUser method declared in AppControl passed down as props to this Login component to set the state of the userName and password to whatever the user types into the form fields.

//Since verifyUser() also calls getUser() from the UsersManager component, the data from that fetch request can be accessed with a promise. I called the data from that promise "user"(line 41). By passing in the state of userName and password as parameters in verifyUser(), the "user" data returned will be a single "user object", if that user of the specified parameters exists in json.

// Properties in the "user" object returned from json are accessed and used to set session storage (where the id of the user is established as the user's unique identifier) and identify the specific, logged-in-user's game collection.

      this.props.verifyUser(this.state.userName, this.state.password)
      .then(user => {
        // console.log("user", user) // // TEST
        sessionStorage.setItem("user", user[0].id)
        let userId = sessionStorage.getItem("user")
        if(userId.length === 0) {
          alert("Please log in with valid credentials")
        } else {
          this.setState({
            user: user[0],
            userId: parseInt(sessionStorage.getItem("user", user[0].id)),
            loggedIn: true
          });
          console.log(this.state.loggedIn);

        }
        if(this.state.loggedIn !== false) {
          console.log(this.state.loggedIn);
  
          this.props.setUser()
          this.props.checkUser()
          // the checkUser method is declared in AppControl.
          this.props.history.push("/list")
        } else {
          console.log("User not logged in; something's screwy");
          console.log(this.state.loggedIn);
  
        }
      }
      );
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
  }
}


