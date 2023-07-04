const Users = require("../../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// const nodemailer = require("nodemailer");
// const { google } = require("googleapis");
// const { OAuth2Client } = require("google-auth-library");
require("dotenv").config();

const postUsers = async (req, res) => {
  const { name, password } = req.body;

  try {
    if (!name || !password) return res.status(400).json({ err: "Please fill in the inputs" });
    
    const nameExists = await Users.findOne({ name });

    if (!nameExists) return res.status(400).json({ err: "Not allowed here." });

    const protectedPassword = await bcrypt.hash(password, 10);

    const { SECRET } = process.env;

    const token = jwt.sign({ name, password: protectedPassword }, SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).json({ nameExists, token });
  } catch (error) {
    console.log(error);
  }
};

module.exports = postUsers;
