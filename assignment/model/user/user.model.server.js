var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel', userSchema);

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByCredentials = findUserByCredentials;
userModel.findUserByUsername = findUserByUsername;
userModel.deleteUser = deleteUser;
userModel.updateUser = updateUser;
userModel.addToWebsite = addToWebsites;
userModel.removeFromWebsites = removeFromWebsites;

module.exports = userModel;

function createUser(user) {
    user.roles = ['USER'];
    return userModel
        .create(user)

}

function findUserById(userId) {
    return userModel.findById(userId);
}

function findUserByCredentials(username, password) {
    return userModel.findOne({username: username, password:password});
}

function findUserByUsername(username) {
    return userModel.findOne({username: username});
}

function deleteUser(userId) {
    return userModel.remove({_id: userId});
}

function updateUser(userId, newUser) {
    delete newUser.username;
    return userModel.update({_id: userId}, {
        $set : {
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            phone: newUser.phone
        }
    });
}

function addToWebsites(userId, websiteId) {
    return userModel
        .findUserById(userId)
        .then(function (user) {
            user.websites.push(websiteId);
            return user.save();

        })
}

function removeFromWebsites(userId, websiteId) {
    return userModel
        .findUserById(userId)
        .then(function (user) {
            user.websites.splice(user._pages.indexOf(websiteId), 1)
            return user.save();
        })
}