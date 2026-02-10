import { Routes, Route } from "react-router-dom";
import WelcomePage from "../../pages/WelcomePage/WelcomePage.jsx";
import AuthPage from "../../pages/AuthPage/AuthPage.jsx";
import HomePage from "../../pages/HomePage/HomePage.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/auth/:mode" element={<AuthPage />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  );
};

export default App;
