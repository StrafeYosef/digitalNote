const Details = require("../../models/detailsModel");
require("dotenv").config();

const postDetails = async (req, res) => {
  const { name, password } = req.body;

  try {
    if (!name || !password)
      res.status(400).json({ err: "Please fill the inputs" });
    const itemsToken = { name, password };
    const secretToken = process.env.SECRET;
    const token = jwt.sign(itemsToken, secretToken, {
      expiresIn: "1d",
    });
    const details = await Details.create({ name, password, token });
    details.save();
    res.status(200).json({ details });
  } catch (error) {
    console.log(error);
  }
};

module.exports = postDetails;
