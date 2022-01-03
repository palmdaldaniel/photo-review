import { useRef, useState } from "react";
import { Form, Container, Button } from "react-bootstrap";

const LoginPage = () => {
  const [displayPassword, setDisplayPassword] = useState(false);
  const emailRef = useRef();
  const pwRef = useRef();
  const confirmPwRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("email", emailRef.current.value);
    console.log("pw", pwRef.current.value);
    console.log("confirm pw", confirmPwRef.current.value);
  };

  return (
    <Container>
      <h3 className="py-3">Register to start using Photo Reviewer</h3>
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
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default LoginPage;
