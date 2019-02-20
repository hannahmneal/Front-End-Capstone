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
} from "reactstrap";


class UserRegistrationForm extends React.Component {

  state = {
    firstname: "",
    lastname: "",
    username: "",
    password: ""
  }
//=========================================================================
// Form handler:

handleFieldChange = evt => {
  const stateToChange = {};
  stateToChange[evt.target.id] = evt.target.value;
  //The "id" here is referring to the HTML element ids in our render() below, not the database ids.
  this.setState(stateToChange);
};

//=========================================================================

//=========================================================================
constructNewUser = evt => {
  evt.preventDefault();
  // console.log(this.state);
  this.props
    .addUser({
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      username: this.state.username,
      password: this.state.password
    })
    // console.log for testing:
    // .then(() => {
    // {console.log("this.state:", this.state)}
    // })
    // .then(() => this.setState({
    //   firstname: this.state.firstname,
    //   lastname: this.state.lastname,
    //   username: this.state.username,
    //   password: this.state.password
    // }))
    this.props.updateAllUsers()
    // Add a route to push back to the login page:
    .then(() => this.props.history.push("/login"));
};

//=========================================================================



//=========================================================================


  render() {
    return (
      <Container>
        <Form>
          <Row>
            <Col>
              <FormGroup>
                <Label for="firstname">First Name</Label>
                <Input
                  type="firstname"
                  name="firstname"
                  id="firstname"
                  placeholder="First Name"
                  // value={this.state.firstname}
                  onChange={this.handleFieldChange}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="lastname">Last Name</Label>
                <Input
                  type="lastname"
                  name="lastname"
                  id="lastname"
                  placeholder="Last Name"
                  // value={this.state.lastname}
                  onChange={this.handleFieldChange}

                />
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col>
              <FormGroup>
                <Label for="username">Username</Label>
                <Input
                  type="username"
                  name="username"
                  id="username"
                  placeholder="Username"
                  // value={this.state.username}
                  onChange={this.handleFieldChange}

                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  // value={this.state.password}
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
                  onClick={this.constructNewUser}
                >Submit New User</Button>
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </Container>
    );
  }
}

export default UserRegistrationForm;
