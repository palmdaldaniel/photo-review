import { useRef, useState } from "react";
import { Form, Container, Button, Alert } from "react-bootstrap";
import useRegisterUser from "../hooks/useRegisterUser";

const LoginPage = () => {
  const [displayPassword, setDisplayPassword] = useState(false);
  const emailRef = useRef();
  const pwRef = useRef();
  const confirmPwRef = useRef();

  const registerUser = useRegisterUser();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // try to register a user.
    await registerUser.createUser(
      emailRef.current.value,
      pwRef.current.value,
      confirmPwRef.current.value
    );


  };

  return (
    <Container>
      <h3 className="py-3">Register to start using Photo Reviewer</h3>

      {registerUser.errorMessage && (
        <Alert variant="warning">
          {registerUser.errorMessage}
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control ref={emailRef} type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            ref={pwRef}
            type={displayPassword ? "text" : "password"}
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            ref={confirmPwRef}
            type={displayPassword ? "text" : "password"}
            placeholder="Confirm Password"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            onChange={() => setDisplayPassword(!displayPassword)}
            type="checkbox"
            label="Show password"
          />
        </Form.Group>
        <Button
          disabled={registerUser.isLoading}
          variant="primary"
          type="submit"
        >
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default LoginPage;
