import { BrowserRouter as Router } from "react-router-dom";

import axios from "axios";

import { UserContextProvider } from "./context/userContext";
import Layout from "./Components/Layout/Layout";
import { Routes } from "./Routes";

axios.defaults.withCredentials = true;

const App = () => {
  return (
    <Router>
      <UserContextProvider>
        <Layout>
          <Routes />
        </Layout>
      </UserContextProvider>
    </Router>
  );
};

export default App;
