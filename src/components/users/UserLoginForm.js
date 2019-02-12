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

const initialLoginState = {
  username: "",
  password: ""
};


class UserLoginForm extends React.Component {

  state = { ...initialLoginState };

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    //The "id" here is referring to the HTML element ids in our render() below, not the database ids.
    this.setState(stateToChange);
  };


  // handleLoginSubmit = evt => {
  //   evt.preventDefault();



  //   this.props.verifyUser(this.props.username, this.props.password);
    // This is where session storage is set! Within the handleLogin (after verification)


  //     this.props.users.forEach(user => {
  //       console.log(user);
  //        SET SESSION STORAGE WITHIN THE FOREACH LOOP
            // THIS IS ALSO WHERE YOU NEED TO TOGGLE LOGIN/LOGOUT
  //     });
  //   }

  // Verify User

  // this.props.verifyUser({username}, {state})

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
                  type="username"
                  name="username"
                  id="username"
                  placeholder="Username"
                  onChange={this.handleFieldChange}
                  value={username}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="password">Enter Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={this.handleFieldChange}
                  value={password}
                />
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col>
              <FormGroup>
                <Button
                  onClick={this.handleLoginSubmit}
                  >Submit New User</Button>
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </Container>
    );
  }
}

export default UserLoginForm;
