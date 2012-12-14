define([
		'jquery',
		'underscore',
        'backbone',
        'handlebars',
        'components/backbeat'
        ],
function ($, _, Backbone, Handlebars) {

    var HandlebarsView = Backbone.View.extend({
        initialize: function () {
            _.bindAll(this);

            this.render();
        },

        render: function () {

            return this;
        }
    });

    HandlebarsView.prototype.createView = function (context, options, attributes) {
        var optstring = "";

        _.each(_.filter(attributes, ['style', 'class']), function (value, key) {
            optstring += Handlebars.makeElement(key, value);
        }, this);

        var fn = null;
        if (options && options.fn)
            fn = options.fn;
        else if (context && context.fn)
            fn = context.fn;
        else if (this.fn)
            fn = this.fn;
        var fnres = fn ? fn(this) : "";

        var res = '<span id="' + attributes['el'] + '" ' + optstring + '>' + fnres + '</span>'
        return fn ? res : new Handlebars.SafeString(res);
    }

    HandlebarsView.views = {}

    HandlebarsView.viewHelper = function (name, viewType) {

        return function (context, options) {
            var realopt;

            if (options)
                realopt = options;
            else if (context)
                realopt = context;
            else
                realopt = this;

            if (context && !realopt.hash['id']) {
                // resolve id from context
                if (context.uid) {
                    realopt.hash['id'] = context.uid;
                }
                else if (context.id) {
                    realopt.hash['id'] = context.id;
                }
                else {
                    realopt.hash['id'] = name;
                }
            }
            var id = realopt.hash['id'];

            // resolve correct view
            var view = viewType;

            if (realopt.hash['view']) {
                if (typeof realopt.hash['view'] == "string") {
                    view = require('views/' + realopt.hash['view']);
                }
                else {
                    view = realopt.hash['view']
                }
            }

            realopt.hash['el'] = 'backbeat_' + name + '_' + id;
            realopt.hash['id'] = id;

            var comp = _.clone(realopt.hash);
            comp['componentFactory'] = view;
            comp['model'] = realopt.data.model;

            realopt.data.viewList.push(comp);

            view = view.prototype;
            while (!view.createView && view.__super__)
                view = view.__super__;

            if (view.createView)
                return _.bind(view.createView, this)(context, options, realopt.hash);

            return _.bind(HandlebarsView.prototype.createView, this)(context, options, realopt.hash);
        };
    }

    HandlebarsView.registerView = function (name, view) {

        if (HandlebarsView.views[name])
            return;

        HandlebarsView.views[name] = view;

        //        alert(name);
        Handlebars.registerHelper(name, HandlebarsView.viewHelper(name, view));
    }

    HandlebarsView.registerView('view', HandlebarsView);

    return HandlebarsView;
});