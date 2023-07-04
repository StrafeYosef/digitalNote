const Mission = require("../../models/missionModel");

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

    return res.status(200).json({ msg: "Mission added succesfully" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = postMission;
