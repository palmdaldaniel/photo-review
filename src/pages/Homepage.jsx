import { useAuthContext } from "../contexts/AuthContext";


const HomePage = () => {

  const {user} = useAuthContext()

  return <h1>Welcome <span>{user?.email}</span></h1>;
};

export default HomePage;
