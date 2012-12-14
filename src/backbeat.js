define([
		'jquery',
		'underscore',
        'backbone',
        'handlebars'
        ],
function ($, _, Backbone, Handlebars) {

// The need for this has been deprecated in latest handlebars release
    Handlebars.registerHelper('eachhash', function (context, options) {
        var fn = options.fn, inverse = options.inverse;
        var ret = "";

        if (context) {
            _.each(context, function (item) {
                ret = ret + fn(item);
            }, this);
        } else {
            ret = inverse(this);
        }
        return ret;
    });

    Handlebars.makeElement = function (id, val) {
        return id + '="' + val + '" ';
    }

    Handlebars.prepareView = function (name, id, options, view) {
        options.hash['el'] = name + '_' + id;
        options.hash['id'] = id;

        var comp = _.clone(options.hash);
        comp['componentFactory'] = view;
        comp['model'] = options.data.model;

        options.data.viewList.push(comp);
    };

    Handlebars.renderViews = function (viewList) {
        _.each(viewList, function (viewHash) {
            var viewtDef = viewHash['componentFactory'];
            var view = new viewtDef({
                el: "#" + viewHash['el'],
                uuid: viewHash['uid'],
                model: viewHash['model'],
                originalID: viewHash['id'],
                templateAttributes: viewHash
            });

            viewHash['component'] = view;
        }, this);
    };

    //  Add a commenting hash:
    Handlebars.registerHelper('comment', function (options) {
        return "";
    });

    //     Add a commenting hash:
    Handlebars.registerHelper('logJSON', function () {
        return JSON.stringify(this);
    });

    return Handlebars;
});