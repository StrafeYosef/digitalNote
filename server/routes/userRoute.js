const router = require("express").Router();
const postUsers = require('../controllers/Users/postUsers');
const getUsers = require('../controllers/Users/getUsers');

router.get("/getUsers", getUsers);
router.post("/postUsers", postUsers);

module.exports = router;
