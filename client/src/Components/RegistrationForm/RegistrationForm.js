import { useState } from "react";
import { useNavigate } from "react-router";

import api from "../../Api";

import "./RegistrationForm.css";

const RegistrationForm = () => {
  const [registerInfo, setRegisterInfo] = useState({});
  const [error, setError] = useState();
  const [regResult, setRegResult] = useState();

  const navigate = useNavigate();

  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log(registerInfo);

    api
      .post("/users/", registerInfo)
      .then((res) => {
        setRegResult(res.data);
        navigate("/login");
      })
      .catch((error) => setError(error));
  };

  const handleNameChange = (event) =>
    setRegisterInfo({ ...registerInfo, firstName: event.target.value });

  const handleSurnameChange = (event) =>
    setRegisterInfo({ ...registerInfo, secondName: event.target.value });

  const handleEmailChange = (event) =>
    setRegisterInfo({ ...registerInfo, email: event.target.value });

  const handlePasswordChange = (event) =>
    setRegisterInfo({ ...registerInfo, password: event.target.value });

  return (
    <form onSubmit={onSubmitHandler}>
      <div id="register-container">
        <h1>Register</h1>
        <p>Please fill in this form to create an account.</p>
        <hr />

        <label htmlFor="firstName">
          <b>Name</b>
        </label>
        <input
          type="text"
          placeholder="Enter Name"
          name="firstName"
          id="firstName"
          onChange={handleNameChange}
          required
        />

        <label htmlFor="secondName">
          <b>Surname</b>
        </label>
        <input
          type="text"
          placeholder="Enter Surname"
          name="secondName"
          id="secondName"
          onChange={handleSurnameChange}
          required
        />

        <label htmlFor="email">
          <b>Email</b>
        </label>
        <input
          type="text"
          placeholder="Enter Email"
          name="email"
          id="email"
          onChange={handleEmailChange}
          required
        />

        <label htmlFor="psw">
          <b>Password</b>
        </label>
        <input
          type="password"
          placeholder="Enter Password"
          name="psw"
          id="psw"
          onChange={handlePasswordChange}
          required
        />
        <hr />

        <p>
          By creating an account you agree to our <span>Terms & Privacy</span>.
        </p>
        <button type="submit" className="registerbtn">
          Register
        </button>
      </div>

      <div className="container signin">
        <p>
          Already have an account? <span>Sign in</span>.
        </p>
      </div>
    </form>
  );
};

export default RegistrationForm;
