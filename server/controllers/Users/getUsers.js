const Users = require("../../models/userModel");

const getUsers = async (req, res) => {
  try {
    const getUser = await Users.find({});
    return res.status(200).json(getUser);
  } catch (error) {
    console.log(error);
  }
};

module.exports = getUsers;
