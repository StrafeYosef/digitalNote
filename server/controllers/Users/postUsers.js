const Users = require("../../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const postUsers = async (req, res) => {
  const { name, password } = req.body;

  try {
    if (!name || !password)
      res.status(400).json({ err: "Please fill the inputs" });

    const protectedPassword = await bcrypt.hash(password, 10);

    const itemsToken = { name, password: protectedPassword };
    const secretToken = process.env.SECRET;

    const token = jwt.sign(itemsToken, secretToken, {
      expiresIn: "1d",
    });
    const newUser = await Users.create({ itemsToken, token });
    await newUser.save();
    res.status(200).json({ newUser });
  } catch (error) {
    console.log(error);
  }
};

module.exports = postUsers;
