import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import api from "../../Api";

import "./LoginForm.css";

const LoginForm = () => {
  const [loginInfo, setLoginInfo] = useState({});
  const [error, setError] = useState();
  const [loginStatus, setLoginStatus] = useState();
  const [userToken, setUserToken] = useState("");
  const [loginReqState, setLoginReqState] = useState({});

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    await api
      .post("/users/login", loginInfo)
      .then((res) => {
        setLoginReqState(res.data);
        setUserToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.id);
      })
      .catch((error) => setError(error))
      .finally(() => {
        if (loginReqState.auth) {
          getAuthInfo();
        }
      });
  };

  const getAuthInfo = () => {
    api.get("/users/login").then((res) => {
      setLoginStatus(res?.data.loggedIn);
      console.log(res);
    });
  };

  const handleEmailChange = (event) =>
    setLoginInfo({ ...loginInfo, email: event.target.value });

  const handlePasswordChange = (event) =>
    setLoginInfo({ ...loginInfo, password: event.target.value });

  useEffect(getAuthInfo, []);

  if (error) {
    return <p>Page error :c</p>;
  }

  return (
    <form onSubmit={handleSubmit} id="login-form">
      <h2>{loginStatus}</h2>
      <label>Email : </label>
      <input
        type="text"
        placeholder="Enter Email"
        name="email"
        onChange={handleEmailChange}
        required
      />
      <label>Password : </label>
      <input
        type="password"
        placeholder="Enter Password"
        name="password"
        onChange={handlePasswordChange}
        required
      />
      <button type="submit">Login</button>
      <input type="checkbox" checked="checked" /> Remember me
      <button type="button" className="cancelbtn">
        {" "}
        Cancel
      </button>
      Forgot <span> password? </span>
    </form>
  );
};

export default LoginForm;
