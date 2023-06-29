const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateToken = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (token && typeof token === "string") {
      const justToken = token.split(" ")[1];
      console.log(justToken);
      if (!justToken)
        return res.status(400).json({ err: "Invalid format or token" });
      jwt.verify(justToken, process.env.SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ err: "token expired" });
        req.user = decoded;
      });
      return res.status(200).json({ msg: "success" });
    }
  } catch (error) {
    console.log(error);
  }
  // req.token = token;
  next();
};

module.exports = authenticateToken;
