import { Link } from "react-router-dom";

import "./MainPage.css";

const MainPage = () => {
  return (
    <div className="main-page">
      <Link to="/workspaces" className="all-workspaces-btn" role="button">
        <button className="main-page-btn">All Workspaces</button>
      </Link>
    </div>
  );
};

export default MainPage;
