import React from "react";
import {
  Container,
  Form,
  FormGroup,
  Button,
  Input,
} from "reactstrap"

export default class UserLoginForm extends React.Component {
  state = {
    username: "",
    password: "",
    userId: "",
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
        // user = [ ]
        // If more than one user has the same username and password, they could potentially log in to someone else's account; need to check more parameters to prevent this from happening.

        if (user.length === 0) {
          alert("Hmmm...There doesn't seem to be an account for you yet.")
          // this.props.registerNewUser();

          this.props.history.push("/register")

          // When the user doesn't exist in json, they are redirected to the register page.
          //The "user" in session storage is not cleared when proceeding to the following code; if a user logs in and is registered, there are two items in session storage: key: user, value: nothing and key: user, value: user.id.

        } else if (user.length !== 0) {

          sessionStorage.setItem("user", user[0].id)

          // The user has been verified and is now a user
          let userId = parseInt(sessionStorage.getItem("user"))

          console.log("userId is:", userId);
          console.log("before the setState", this.state.loggedIn);  // // TEST: checking timing

// Setting state at this time should be an asynchronous event but it currently works. If your state goes wonky, look at this first!
          this.setState({
            user: user[0],
            userId: parseInt(sessionStorage.getItem("user", user[0].id)),
            loggedIn: true
          })
          console.log("before the if", this.state.loggedIn);  // // TEST: checking timing

          if (this.state.loggedIn !== false) {
            console.log("inside the if", this.state.loggedIn); // // TEST: checking timing

            this.props.setUser()
            this.props.updateGameState()
            // the updateGameState() and setUser() methods are declared in AppControl. They trigger AppControl to update its state based on the changes that occur in this component.

            this.props.history.push("/list")

          } else {
            console.log("User not logged in; something's screwy");
            // console.log(this.state.loggedIn);
          }
        }
      });
      // The verifyUser() function (lines ~42-89) was checked from start to finish with a series of console.logs numbered 1 - 9 to verify the sequence of events was happening in the correct sequence: the events happen linearly, as written.
  }

  render() {
    const { username, password } = this.state;

    return (
      <Container>
        <Form className="login-form">
              <FormGroup>
                <Input
                className="login-input"
                bsSize="small"
                  type="text"
                  name="loginUsername"
                  id="username"
                  placeholder="Enter Username"
                  value={username}
                  onChange={this.handleFieldChange}
                />
              </FormGroup>
            {/* </Col>
            <Col> */}
              <FormGroup>
                <Input
                  className="login-input"
                  type="password"
                  name="loginPassword"
                  id="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={this.handleFieldChange}
                />
              </FormGroup>
              <FormGroup>
                <Button
                  type="submit"
                  className="loginBtn"
                  onClick={this.handleLoginSubmit}
                >Submit</Button>
              </FormGroup>
        </Form>
      </Container>
    );
  }
}



