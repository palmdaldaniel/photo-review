import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const useLoginUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const { login } = useAuthContext();

  const signIn = async (email, pw) => {
    try {
      setIsLoading(true);

      await login(email, pw);

      // navigate user to homepage if all goes well.
      navigate("/");
    } catch (error) {
      setErrorMessage(error.message);
      setIsLoading(false);
    }
  };

  return { signIn, isLoading, errorMessage };
};

export default useLoginUser;
