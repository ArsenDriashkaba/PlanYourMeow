import { useContext } from "react";
import { useNavigate } from "react-router";
import LoginForm from "../../Components/LoginForm/LoginForm";

import userContext from "../../context/userContext";

import "./LoginPage.css";

const LoginPage = () => {
  const userCtx = useContext(userContext);
  const navigate = useNavigate();

  if (userCtx.userId) {
    navigate(`/workspaces/`);
  }

  return (
    <div className="login-page">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
