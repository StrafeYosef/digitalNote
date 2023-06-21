const Users = require('../../models/userModel');

const getUsers = async(req, res) => {
    res.json({msg: 'hh'})
    // try {
    //     const getUser = await getUsers.find({})
    //     return res.status(200).json(getUser);
        
    // } catch (error) {
    //     console.log(error)
    // }
} 

module.exports = getUsers;