import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const useRegisterUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();
  const { register, user } = useAuthContext();

  console.log(user?.uid);

  const createUser = async (email, password, confirmPassword) => {
    if (password !== confirmPassword) {
      setErrorMessage("Passwords does not match");
      return;
    }

    try {
      setIsLoading(true);
      await register(email, password);

      // when registration is successfull navigate to homepage view
      navigate("/");
    } catch (error) {
      setErrorMessage(error.message);
      setIsLoading(false);
    }
  };

  return { isLoading, errorMessage, createUser, setErrorMessage };
};

export default useRegisterUser;
