import { useParams } from "react-router-dom";
import s from "./AuthPage.module.css";

const AuthPage = () => {
  const { mode } = useParams();

  return (
    <div className={s.container}>
      <h1>{mode === "login" ? "Log In" : "Registration"}</h1>
      {/* Auth form will be added here */}
    </div>
  );
};

export default AuthPage;
