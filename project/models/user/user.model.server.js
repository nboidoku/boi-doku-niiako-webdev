var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('IUserModel', userSchema);

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByUsername = findUserByUsername;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;


module.exports = userModel;


function createUser(user) {
    return userModel.create(user)
}

function findUserById(userId) {
    return userModel.findOne({_id: userId});
}

function findUserByUsername(username) {
    return userModel.findOne({username: username});
}

function updateUser(userId, user) {
    return userModel.update({_id: userId}, {
        $set:{
            firstName : user.firstName,
            lastName: user.lastName
        }
    })
}

function deleteUser(userId) {
    return userModel.remove(userId);
}
