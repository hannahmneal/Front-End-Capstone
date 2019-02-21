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


const initialState = {
  firstname: "",
  lastname: "",
  username: "",
  password: ""
}
class UserRegistrationForm extends React.Component {

  state= {...initialState}
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
  console.log("register 1");

  this.props
    .addUser({
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      username: this.state.username,
      password: this.state.password
    }
    )
    .then(() => this.setState(initialState, () => this.props.history.push("/login")))
    // When state is set, 


};

  render() {

    const { firstname, lastname, username, password } = this.state;

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
                  value={firstname}
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
                  value={lastname}
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
                  value={username}
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
