const Mission = require("../../models/missionModel");
const nodemailer = require("nodemailer");
const { OAuth2Client } = require("google-auth-library");
const axios = require("axios");
let accessToken = null;
let accessTokenExpiration = 0;
require("dotenv").config();

async function refreshAccessToken(refreshToken) {
  const oAuth2Client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    "http://localhost:5174/missions/postMission"
  );

  try {
    const { tokens } = await oAuth2Client.refreshToken(refreshToken);
    return tokens.access_token;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    throw new Error("Error refreshing access token");
  }
}

const postMission = async (req, res) => {
  const { first, email, second, third, date } = req.body;
  try {
    if (
      !first ||
      !second ||
      !third ||
      !email ||
      !Array.isArray(third) ||
      third.length === 0 ||
      !date
    ) {
      return res.status(400).json({ err: "Пожалуйста, заполните все поля." });
    }

    const newMission = new Mission({ first, email, second, third, date });
    await newMission.save();

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
      },
    });

    if (!accessToken || Date.now() / 1000 > accessTokenExpiration) {
      try {
        accessToken = await refreshAccessToken(process.env.REFRESH_TOKEN);
        accessTokenExpiration = Date.now() / 1000 + 3600;
        console.log("Access Token Refreshed:", accessToken);
      } catch (error) {
        return res.status(500).json({ err: "Error refreshing access token" });
      }
    }

    const tokenInfoUrl =
      "https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=" +
      accessToken;
    try {
      const response = await axios.get(tokenInfoUrl);
      const tokenInfo = response.data;
      console.log("Current Token Info:", tokenInfo);

      if (tokenInfo.aud !== process.env.CLIENT_ID) {
        console.error("Invalid access token");
        return res.status(401).json({ err: "Invalid access token" });
      }

      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Welcome to MyApp",
        text: `Welcome to MyApp!`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error occurred while sending the email:", error);
          return res.status(500).json({ err: "Error sending email" });
        } else {
          console.log("Email sent successfully!", info);
          return res
            .status(200)
            .json({ msg: "Mission and email added successfully" });
        }
      });
    } catch (error) {
      console.error("Error checking token validity:", error);
      return res.status(500).json({ err: "Error checking token validity" });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = postMission;
