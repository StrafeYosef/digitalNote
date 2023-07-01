const router = require("express").Router();
const postMission = require("../controllers/Missions/postMission");
const getMissions = require('../controllers/Missions/getMissions');

router.get("/getMissions", getMissions);
router.post("/postMission", postMission);

module.exports = router;
