const Missions = require("../../models/missionModel");

const getMissions = async (req, res) => {
  try {
    const currentMissions = await Missions.find({});
    return res.status(200).json(currentMissions);
  } catch (error) {
    return res.status(500).json({ err: "Internal error" });
  }
};

module.exports = getMissions;
