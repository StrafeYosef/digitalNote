const Details = require('../../models/detailsModel');

const getDetails = async(req, res) => {
    try {
        const getInputs = await getDetails.find({})
        return res.json(getInputs);
        
    } catch (error) {
        console.log(error)
    }
} 

module.exports = getDetails;