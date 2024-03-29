import React, { useState } from "react";
import {
  Container,
  Form,
  Button,
  FormGroup,
  Label,
  Col,
  Input,
  Row,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "reactstrap";

const SignIn = () => {
  const [userData, setUserData] = useState({ email: "", password: "" });

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(userData);
  };

  return (
    <Container className='text-center mt-4 pt-5'>
      <Row>
        <Col lg={6} className='offset-lg-3 mt-5'>
          <Card>
            <Form onSubmit={submitHandler}>
              <CardHeader className=''>SignIn here</CardHeader>
              <CardBody>
                <FormGroup row>
                  <Label for='email' sm={3}>
                    Email
                  </Label>
                  <Col sm={9}>
                    <Input
                      type='email'
                      name='email'
                      id='email'
                      placeholder='provide your email'
                      value={userData.email}
                      onChange={(e) =>
                        setUserData({ ...userData, email: e.target.value })
                      }
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for='password' sm={3}>
                    Password
                  </Label>
                  <Col sm={9}>
                    <Input
                      type='password'
                      name='password'
                      id='password'
                      placeholder='your password here'
                      value={userData.password}
                      onChange={(e) =>
                        setUserData({ ...userData, password: e.target.value })
                      }
                    />
                  </Col>
                </FormGroup>
              </CardBody>
              <CardFooter>
                <Button type='submit' block color='primary'>
                  Sign In
                </Button>
              </CardFooter>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
