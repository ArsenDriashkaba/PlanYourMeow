import { useContext } from "react";
import { useNavigate } from "react-router";
import RegistrationForm from "../../Components/RegistrationForm/RegistrationForm";

import userContext from "../../context/userContext";

import "./MainPage.css";

const MainPage = () => {
  const userCtx = useContext(userContext);
  const navigate = useNavigate();

  if (userCtx.userId) {
    navigate(`/workspaces/`);
  }

  return (
    <div className="main-page">
      <RegistrationForm />
    </div>
  );
};

export default MainPage;
