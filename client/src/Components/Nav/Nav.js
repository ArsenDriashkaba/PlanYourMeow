import { useContext } from "react";
import userContext from "../../context/userContext";

import "./Nav.css";

const Nav = () => {
  const userCtx = useContext(userContext);

  return (
    <nav>
      <h1 id="logo">PlanYourMeow</h1>
      <h2>{userCtx.username}</h2>
      <button onClick={userCtx.userLogOut}>LogOut</button>
    </nav>
  );
};

export default Nav;
