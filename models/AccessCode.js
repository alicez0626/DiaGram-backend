const mongoose = require('mongoose');
const errors = require('../config/errorTypes.js');

const accessCodeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    // TODO: constrain accessCodes to a set format
    accessCode: { type: String, required: true, unique: true },
    userType: { type: String, enum: ['admin', 'patient', 'doctor'], required: true }
});

const model = mongoose.model('AccessCode', accessCodeSchema);

/**
 * checks to see if the string of code exists within db
 * @returns {Promise}
 *      resolves: userType assoicated to the code
 *      rejects: error
 * @param {String} code
 */
function exist(code) {
    return model
        .findOne({ accessCode: code })
        .then((result) => {
            if (result) {
                return result.userType;
            }
            throw { errors: [errors.INVALID_ACCESS_CODE] };
        });
}

module.exports = {
    model,
    exist,
}
