import jsonwebtoken from "jsonwebtoken";

const verifyAuth = (req, res, next) => {
  try {
    const token = req.header("auth-token");

    if (!token) {
      res.status(401).send("Access Denied ._.");
    }

    try {
      const verified = jsonwebtoken.verify(token, "planYourMeowSecretToken");
      req.user = verified;
      next();
    } catch (err) {
      res.status(400).send("Invalid token");
    }
  } catch (error) {
    res.status(500).send("Error!");
  }
};

export default verifyAuth;
