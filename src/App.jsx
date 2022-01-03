import { Route, Routes } from "react-router-dom";
import "./App.scss";

//components
import IsProtected from "./components/IsProtected";

//pages
import HomePage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import LogoutPage from "./pages/LogoutPage";
import NotFoundPage from "./pages/NotFoundPage";

//partial
import Navigation from "./pages/partials/Navigation";

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route
          path="/"
          element={
            <IsProtected redirectTo="/login">
              <HomePage />
            </IsProtected>
          }
        />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
