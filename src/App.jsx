import { Route, Routes } from "react-router-dom";
import "./App.scss";

//partial
import Navigation from "./pages/partials/Navigation";

//pages
import AlbumPage from "./pages/AlbumPage";
import HomePage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import NotFoundPage from "./pages/NotFoundPage";
import ReviewPage from "./pages/ReviewPage";
import SignupPage from "./pages/SignupPage";

//components
import IsProtected from "./components/IsProtected";

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
        <Route
          path="/albums/:albumId"
          element={
            <IsProtected redirectTo="/login">
              <AlbumPage />
            </IsProtected>
          }
        />
        <Route path="/preview/:albumId"  element={<ReviewPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
