import { BrowserRouter as Router } from "react-router-dom";

import axios from "axios";

import Layout from "./Components/Layout/Layout";
import { Routes } from "./Routes";

axios.defaults.withCredentials = true;

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes />
      </Layout>
    </Router>
  );
};

export default App;
