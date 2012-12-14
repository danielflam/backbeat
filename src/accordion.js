define([
		'jquery',
		'underscore',
        'backbone',
        'handlebars',
        'components/view',
        'components/backbeat',
        'jqueryui/jquery.ui.core',
        'jqueryui/jquery.ui.widget',
	    'jqueryui/jquery.ui.accordion'
        ],
function ($, _, Backbone, Handlebars, HandlebarsView) {

    var View = Backbone.View.extend({
        initialize: function () {
            _.bindAll(this);

            this.render();

        },

        remove: function () {
            // unbind the namespaced event (to prevent accidentally unbinding some
            // other resize events from other code in your app
            $(window).off("resize.app");

            // don't forget to call the original remove() function
            Backbone.View.prototype.remove.call(this);
        },

        render: function () {
            this.$el.accordion({
                fillSpace: true
            });

            _.defer(this.initResize);

            return this;
        },
        initResize: function () {
            $(window).on("resize.app", _.bind(this.resize, this));
        },
        resize: function () {
            this.$el.accordion("resize");
        }

    });

    View.prototype.createView = function (context, options, attributes) {
        var fn = null;
        if (options && options.fn)
            fn = options.fn;
        else if (context && context.fn)
            fn = context.fn;
        else if (this.fn)
            fn = this.fn;
        var fnres = fn ? fn(this) : "";

        return "<div id='" + attributes['el'] + "'>" + fnres + "</div>";
    }

    HandlebarsView.registerView('accordion', View);

    Handlebars.registerHelper('accordionSection', function (options) {
        var title = options.hash['title'];

        var fn = null;
        if (options && options.fn)
            fn = options.fn;
        else if (this.fn)
            fn = this.fn;
        var fnres = fn ? fn(this) : "";

        return '<h3><a href="#">' + title + '</a></h3><div>' + fnres + "</div>";
    });

    return View;
});