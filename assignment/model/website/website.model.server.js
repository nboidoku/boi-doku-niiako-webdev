var mongoose = require('mongoose');
var websiteSchema = require('./website.schema.server');
var websiteModel = mongoose.model('WebsiteModel', websiteSchema);
var userModel = require('../user/user.model.server');

websiteModel.createWebsite = createWebsite;
websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;
websiteModel.addToPages = addToPages;
websiteModel.removeFromPages = removeFromPages;

module.exports = websiteModel;


function createWebsite(website) {
    return websiteModel
        .create(website)
        .then(function (website) {
            userModel.addToWebsite(website._user, website._id);
            return website;
        })
}

function findAllWebsitesForUser(userId) {
    return websiteModel
        .find({_user: userId})
        .populate('_user')
        .exec();
}

function findWebsiteById(websiteId) {
    return websiteModel
        .findById(websiteId)

}

function updateWebsite(websiteId, newWebsite) {
    return websiteModel.update({_id: websiteId}, {
        $set: {
            name: newWebsite.name,
            description: newWebsite.description,
            dateUpdated: Date.now(),
        }
    })
}

function deleteWebsite(websiteId) {
    websiteModel.findWebsiteById(websiteId)
        .then(function (website) {
            userId = website._user
        })
        .then(function () {
            UserModel.removeFromWebsites(websiteId)
        })
    return websiteModel.remove({_id: websiteId})
}

function addToPages(websiteId, pageId) {
    return websiteModel
        .findWebsiteById(websiteId)
        .then(function (website) {
            website.pages.push(pageId)
            return website.save();
        })
}

function removeFromPages(websiteId, pageId) {
    return websiteModel
        .findWebsiteById(websiteId)
        .then(function (website) {
            website._pages.splice(website._pages.indexOf(pageId), 1);
            return website.save();

        })
}