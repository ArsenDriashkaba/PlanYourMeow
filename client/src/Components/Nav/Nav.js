import { useContext } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

import userContext from "../../context/userContext";

import "./Nav.css";

const Nav = () => {
  const userCtx = useContext(userContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    userCtx.userLogOut();
    navigate("/login");
  };

  return (
    <nav>
      <Link
        to={userCtx.userId ? "/workspaces" : "/"}
        style={{ textDecoration: "none" }}
      >
        <h1 id="logo">PlanYourMeow</h1>
      </Link>

      <div className="log-out-container">
        <h2>{userCtx.username}</h2>
        {userCtx.userId ? (
          <button onClick={handleLogOut}>Log Out</button>
        ) : (
          <div className="login-register-container">
            <button onClick={() => navigate("/login")}>Login</button>
            <button onClick={() => navigate("/")}>Register</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
