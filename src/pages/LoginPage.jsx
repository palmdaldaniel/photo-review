import { useRef } from "react";
import { Form, Container, Button } from "react-bootstrap";

const LoginPage = () => {
  const emailRef = useRef();
  const pwRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("email", emailRef.current.value);
    console.log("pw", pwRef.current.value);
  };

  return (
    <Container>
      <h3 className="py-3">Sign in to start using Photo Reviewer</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control ref={emailRef} type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control ref={pwRef} type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default LoginPage;
