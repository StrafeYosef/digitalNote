const Details = require("../../models/detailsModel");

const postDetails = async (req, res) => {
  const { input } = req.body;

  try {
    if (!input) res.status(400).json({ err: "Please fill the input" });

    const newInput = await Details.create({ input });

    res.status(200).json({ newInput });
  } catch (error) {
    console.log(error);
  }
};

module.exports = postDetails;
