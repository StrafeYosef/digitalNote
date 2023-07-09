const Mission = require("../../models/missionModel");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");

require("dotenv").config();

const postMission = async (req, res) => {
  const { first, email, second, third, checkDetails, date, theIndex, mainIndex, total } = req.body;

  const html = `
    <h1 style="font-weight: bold; color: #292068">${process.env.NAME}</h1>
    <h3 style="color: #292068">קוסמטיקה רפואית - הסרת שיער בלייזר</h3>
    <h4 style="color: #292068">${process.env.DETAILSONE}</h4>
    <h4 style="color: #292068">${process.env.DETAILSTWO}</h4>
    <h3 style="color: #292068">קבלה מספר ${theIndex} / ${mainIndex}</h3>
    <h3 style="color: #292068">לכבוד ${first}</h3>
    <div>
      <h3 style="text-decoration: underline; color: #6a2c8c">פרטי ההזמנה</h3>
      <div style="color: #6a2c8c">
      ${third.map((thi) => {
        return `<h4>${thi[0] > 1 ? thi[0] : ""} ${thi[1]} ${thi[2]}</h4>`;
      })}
      </div>
    </div>
    <h4 style="color: #6a2c8c">סה"כ ${total}</h4>
    <h4 style="color: #6a2c8c">שולם ב-${second}</h4>
    ${
      second === "צ'ק"
        ? `<p style="color: #6a2c8c"><strong>צק מספר:</strong> ${checkDetails[0]}</p>
      </br>
      <p style="color: #6a2c8c"><strong>בנק:</strong> ${checkDetails[1]}</p>
      </br>
      <p style="color: #6a2c8c"><strong>ז"פ:</strong> ${checkDetails[2]}</p>
      </br>
      <p style="color: #6a2c8c"><strong>סך:</strong> ${checkDetails[3]}</p>`
        : ""
    }
    <h4 style="text-decoration: underline; color: #6a2c8c">תאריך ${date}</h4>
  `;

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

    const newMission = new Mission({
      first,
      email,
      second,
      third,
      total,
      checkDetails,
      theIndex,
      mainIndex,
      date,
    });
    await newMission.save();

    const OAuth2Client = new google.auth.OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      process.env.REDIRECT_URI
    );

    OAuth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN,
    });

    async function sendMail() {
      try {
        const accessToken = await OAuth2Client.getAccessToken();

        if (OAuth2Client.isTokenExpiring()) {
          const { res: refreshResponse } =
            await OAuth2Client.refreshAccessToken();
          accessToken = refreshResponse.access_token;
        }

        const transport = nodemailer.createTransport({
          service: "gmail",
          auth: {
            type: "OAuth2",
            user: process.env.EMAIL,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken,
          },
        });

        const mailOptions = {
          from: process.env.EMAIL,
          to: email,
          subject: "תודה רבה שבחרתם בקוסמטיקה רפואית - הסרת שיער בלייזר",
          html: html.toString(),
        };

        const result = await transport.sendMail(mailOptions);
        return result;
      } catch (error) {
        throw new Error("Error sending email: " + error.message);
      }
    }

    sendMail()
      .then((result) => {
        console.log("Email sent!", result);
        return res.status(200).json({ message: "Email sent successfully!" });
      })
      .catch((err) => {
        console.log(err.message);
        return res.status(500).json({ error: err.message });
      });
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = postMission;
