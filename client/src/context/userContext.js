import { createContext, useState, useEffect } from "react";

const userContext = createContext({
  userId: "",
  username: "",
  token: "",
});

export const UserContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userToken = localStorage.getItem("id_token");

    if (userToken && user) {
      setUser(user);
      setToken(userToken);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user, token]);

  const logInHandler = (response) => {
    setToken(response.token);
    setUser({
      userId: response.id,
      username: response.firstName,
    });

    localStorage.setItem("id_token", response.token);
  };

  const logOutHandler = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("user");
    localStorage.removeItem("id_token");
  };

  const context = {
    userId: user?.userId,
    username: user?.username,
    token: token,
    userLogIn: logInHandler,
    userLogOut: logOutHandler,
  };

  return (
    <userContext.Provider value={context}>
      {props.children}
    </userContext.Provider>
  );
};

export default userContext;
