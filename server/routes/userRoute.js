const router = require("express").Router();
const postUsers = require('../controllers/Users/postUsers');
const getUsers = require('../controllers/Users/getUsers');
const protectedUser = require('../middlewares/protectUser');

router.get("/getUsers", getUsers);
router.post("/postUsers", protectedUser, postUsers);

module.exports = router;
