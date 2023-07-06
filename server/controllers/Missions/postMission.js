const Mission = require("../../models/missionModel");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");

require("dotenv").config();

const postMission = async (req, res) => {
  const { first, email, second, third, checkDetails, date } = req.body;

  // const someValues = [
  //   "להלהללה",
  //   "קוסמטיקה רפואית - הסרת שיער בלייזר",
  //   "טל': 050-123-1234 | אי מייל: akaa@.il",
  //   `קבלה מספר 0001 /3`,
  //   "הכדשכש 4214 הכגד 1234567",
  //   `לכבוד ${first}`,
  //   "",
  //   "!תודה על בחירתכם בשירות שלנו",
  //   ".אם יש לכם כל משוב או שאלה, אנא אל תהססו ליצור קשר עימי",
  //   ",בברכה",
  //   "להלהללה",
  // ];

  // const html = someValues.map((some, index) => {
  //   if (index === 7 || index === 8 || index === 9) {
  //     return `<table style="width: 100%; border-collapse: collapse; border: 1px solid black;">
  //       <tr>
  //         <td style="text-align: right; padding: 10px;">
  //           <p style="font-size: 20px; font-weight: bold;"><strong>${some}</strong></p>
  //         </td>
  //       </tr>
  //     </table>`;
  //   } else {
  //     return `<p style="font-size: 18px;">${some}</p>`;
  //   }
  // });

  const html = `
    <h1 style="font-weight: bold">טניה אבן חן ינושוק</h1>
    <h3>קוסמטיקה רפואית - הסרת שיער בלייזר</h3>
    <h4>הרימון 34 באר גנים 7928900 | טלפון: 054-745-9178</h4>
    <h4>אי מייל: tec1@012.net.il | עוסק פטור מספר 317956951</h4>
    <h3>קבלה מספר 0001 / 3</h3>
    <h4>לכבוד ${first}</h4>
      <div>
        
        <p>סך הכל: 250</p>

      </div>
      <h4>שולם ב-${second}</h4>
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
      checkDetails,
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
