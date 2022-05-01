import { Link } from "react-router-dom";
import RegistrationForm from "../../Components/RegistrationForm/RegistrationForm";
import LoginForm from "../../Components/LoginForm/LoginForm";

import "./MainPage.css";

const MainPage = () => {
  return (
    <div className="main-page">
      {/* <Link to="/workspaces" className="all-workspaces-btn" role="button">
        <button className="main-page-btn">All Workspaces</button>
      </Link> */}
      <LoginForm />
      <RegistrationForm />
    </div>
  );
};

export default MainPage;
