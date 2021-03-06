import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import userContext from "../../context/userContext";

import api from "../../Api";

import "./LoginForm.css";

const LoginForm = () => {
  const [loginInfo, setLoginInfo] = useState({});
  const [error, setError] = useState(null);
  const userCtx = useContext(userContext);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    await api
      .post("/users/login", loginInfo)
      .then((res) => {
        if (res.status === 200) {
          userCtx.userLogIn(res.data);
          navigate("/workspaces");
        }
      })
      .catch((error) => {
        setError(error);
        navigate("/");
      });
  };

  const handleEmailChange = (event) =>
    setLoginInfo({ ...loginInfo, email: event.target.value });

  const handlePasswordChange = (event) =>
    setLoginInfo({ ...loginInfo, password: event.target.value });

  return (
    <form onSubmit={handleSubmit} id="login-form">
      <span>{error?.message}</span>
      <h2>Login</h2>
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
      <button type="submit" className="login-btn">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
