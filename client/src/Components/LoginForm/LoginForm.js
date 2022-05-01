import { useState } from "react";
import { useNavigate } from "react-router";

import api from "../../Api";

import "./LoginForm.css";

const LoginForm = () => {
  const [loginInfo, setLoginInfo] = useState({});
  const [error, setError] = useState();

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    api
      .post("/users/login", loginInfo)
      .then((res) => {
        setLoginInfo(res.data);
        console.log(loginInfo);
      })
      .catch((error) => setError(error));
  };

  const handleEmailChange = (event) =>
    setLoginInfo({ ...loginInfo, email: event.target.value });

  const handlePasswordChange = (event) =>
    setLoginInfo({ ...loginInfo, password: event.target.value });

  return (
    <form onSubmit={handleSubmit} id="login-form">
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
