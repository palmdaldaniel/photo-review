import { useRef } from "react";
import { Form, Container, Button, Alert } from "react-bootstrap";
import useLoginUser from "../hooks/useLoginUser";
import { Link } from "react-router-dom";
const LoginPage = () => {
  const emailRef = useRef();
  const pwRef = useRef();
  const { signIn, isLoading, errorMessage } = useLoginUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn(emailRef.current.value, pwRef.current.value);
  };

  return (
    <Container>
      <h3 className="py-3">Sign in to start using Photo Reviewer</h3>
      {errorMessage && <Alert variant="warning">{errorMessage}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            required
            ref={emailRef}
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            ref={pwRef}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <div className="d-md-flex flex-row-reverse justify-content-between">
        <p><Link to={'/signup'}>Register?</Link></p>
        <Button disabled={isLoading} variant="primary" type="submit">
          Login
        </Button>
        </div>
      </Form>
    </Container>
  );
};

export default LoginPage;
