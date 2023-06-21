const router = require("express").Router();
const getDetails = require("../controllers/Details/getDetails");
const postDetails = require("../controllers/Details/postDetails");

router.get("/getDetails", getDetails);
router.post("/postDetails", postDetails);

module.exports = router;
