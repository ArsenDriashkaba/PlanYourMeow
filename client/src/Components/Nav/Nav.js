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
    navigate("/");
  };

  return (
    <nav>
      <Link to="/workspaces">
        <h1 id="logo">PlanYourMeow</h1>
      </Link>

      <div className="log-out-container">
        <h2>{userCtx.username}</h2>
        {userCtx.userId && <button onClick={handleLogOut}>Log Out</button>}
      </div>
    </nav>
  );
};

export default Nav;
