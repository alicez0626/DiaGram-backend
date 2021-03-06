const debug = require('debug')('diagram:model:User');
const mongoose = require('mongoose');
const errors = require('../config/errorTypes.js');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    userType: { type: String, enum: ['admin', 'patient', 'doctor'], required: true },
    firstName: { type: String },
    lastName: { type: String },
    // following: [mongoose.Schema.Types.ObjectId], not used for now
    createdAt: { type : Date, default: Date.now, select: false },
    updatedAt: { type : Date, default: Date.now, select: false }
});

const model = mongoose.model('User', userSchema);

/**
 *
 * @return {Promise} resolve: User model
 *
 * @param {Object} user object containing the fields to create a User model
 */
const create = (user) => {
    debug('create()');

    let userModel = new model(user);
    var validate = userModel.validateSync();
    var errors = [];

    return model
        .find({ username: user.username }) /* asyn call db just to check for user name duplication */
        .then((result) => {
            /* NOT SUPPORTED YET
            if (result && result.length > 0) {
                errors.push(errors.DUPLICATE_USERNAME);
            }

            if (validate.errors['password'].message) {
                errors.push(errors.INVALID_PASSWORD);
            }

            if (validate.errors['userType'].message) {
                errors.push(errors.INVALID_USER_TYPE);
            }

            if (errors.length > 0) {
                throw { error: errors };
            }
            */

            return userModel;
        });
}

// TEMP: authentication function: checks if user with username and password
// exists in database, returns user document if it does
const authenticate = (user) => {
    debug('authenticate()');

    return model
        .findOne({ username: user.username, password: user.password })
        .then((result) => {
            return result;
        });
}

module.exports = {
    model,
    create,
    authenticate,
}
