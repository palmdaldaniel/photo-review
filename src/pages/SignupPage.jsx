import { setPersistence } from "firebase/auth";
import { useRef, useState } from "react";
import { Form, Container, Button } from "react-bootstrap";

import { useAuthContext } from "../contexts/AuthContext";

const LoginPage = () => {
 const [isLoading, setIsLoading] = useState(false)
  const { register } = useAuthContext();

  const [displayPassword, setDisplayPassword] = useState(false);
  const emailRef = useRef();
  const pwRef = useRef();
  const confirmPwRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true)


    if (pwRef.current.value !== confirmPwRef.current.value) {
      setIsLoading(false)
     
      return;
    }


    try {
      register(emailRef.current.value, pwRef.current.value);
      setIsLoading(false)
    
    } catch (error) {
      console.log("something went fucking wrong");
      setIsLoading(false)
    }

    emailRef.current.value = "";
    pwRef.current.value = "";
    confirmPwRef.current.value = '';
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
        <Button disabled={isLoading} variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default LoginPage;
