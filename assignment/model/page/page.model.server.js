var mongoose = require('mongoose');

var pageSchema = require('./page.schema.server');

var pageModel = mongoose.model("PageModel", pageSchema);

var websiteModel = require('../website/website.model.server');


pageModel.createPage = createPage;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;
pageModel.addToWidgets = addToWidgets;
pageModel.removeFromWidgets = removeFromWidgets;

module.exports = pageModel;

function createPage(page) {
    return pageModel.create(page)
        .then(function (page) {
            websiteModel.addToPages(page._website, page._id);
            return page
        })
}

function findAllPagesForWebsite(websiteId) {
    return pageModel
        .find({_website: websiteId})
        .populate('_website')
        .exec();
}

function findPageById(pageId) {
    return pageModel.findById(pageId);
}

function updatePage(pageId, page) {
    console.log(page.widgets);
    return pageModel.update({_id: pageId}, {
        $set: {
            name: page.name,
            title: page.title,
            description: page.description,
            dateUpdated: Date.now()
        }
    })
}

function deletePage(pageId) {
    pageModel.findPageById(pageId)
        .then(function (page) {
            websiteId = page._website
        })
        .then(function () {
            websiteModel
                .removeFromPages(websiteId, pageId);
        });
    return pageModel.remove({_id: pageId});

}

function addToWidgets(pageId, widgetId) {
    return pageModel
        .findPageById(pageId)
        .then(function (page) {
            page.widgets.push(widgetId)
            return page.save();

        })
}

function removeFromWidgets(pageId, widgetId) {
    return pageModel
        .findPageById(pageId)
        .then(function (page) {
            page.widgets.splice(page.widgets.indexOf(widgetId), 1);
            return page.save();
        })
}