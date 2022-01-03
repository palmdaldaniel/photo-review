import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

const LogoutPage = () => {
  const { logout } = useAuthContext();

  const navigate = useNavigate();

  useEffect(async () => {
    await logout();
    navigate("/login");
  }, []);

  return <h1>Logging you out!</h1>;
};

export default LogoutPage;
