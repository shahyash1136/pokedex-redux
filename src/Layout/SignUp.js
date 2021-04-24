import React from "react";
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

const SignUp = () => {
  return (
    <Container className='text-center'>
      <Row>
        <Col lg={6} className='offset-lg-3 mt-5'>
          <Card>
            <Form>
              <CardHeader className=''>SignUp here</CardHeader>
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
                    />
                  </Col>
                </FormGroup>
              </CardBody>
              <CardFooter>
                <Button type='submit' block color='primary'>
                  Sign Up
                </Button>
              </CardFooter>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
