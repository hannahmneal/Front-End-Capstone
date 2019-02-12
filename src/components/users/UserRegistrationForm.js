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

const initialUserState = {
  firstname: "",
  lastname: "",
  username: "",
  password: ""

}



class UserRegistrationForm extends React.Component {

state = [...initialUserState]

//=========================================================================
// Form handlers:

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
    .addUser(this.state)
    // console.log for testing:
    // .then(() => {
    // {console.log("this.state:", this.state)}
    // })
    .then(() => this.setState(initialUserState))
    // Don't forget to add a route to push back to the dashboard!
    .then(() => this.props.history.push("/games/dashboard"));
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
                <Label for="firstName">First Name</Label>
                <Input
                  type="firstName"
                  name="firstName"
                  id="firstName"
                  placeholder="First Name"
                  onChange={this.handleFieldChange}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="lastName">Last Name</Label>
                <Input
                  type="lastName"
                  name="lastName"
                  id="lastName"
                  placeholder="Last Name"
                  onChange={this.handleFieldChange}

                />
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
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
                  onClick={(console.log("Registration button clicked!"))}
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
