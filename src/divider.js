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
            //            this.$el.accordion({
            //                fillSpace: true
            //            });
            $(window).on("resize.app", _.bind(this.resize, this));

            return this;
        },
        resize: function () {
            //  this.$el.accordion("resize");
        }

    });

    Handlebars.registerHelper('dividerSection', function (options) {
        var title = options.hash['title'];

        var fn = null;
        if (options && options.fn)
            fn = options.fn;
        else if (this.fn)
            fn = this.fn;
        var fnres = fn ? fn(this) : "";

        var res =
        '<h3 class="ui-accordion-header ui-helper-reset ui-state-default ui-corner-top">' +
        //        '<span class="ui-icon ui-icon-triangle-1-s"/>' +
        '<a href="#">' + title + '</a></h3>' +
        '<div class="ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content-active">' +
        fnres + '</div>';

        return res;
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

        return '<div class="ui-accordion ui-widget ui-helper-reset" id="' + attributes['el'] + '">' + fnres + '</div>';
    };

    HandlebarsView.registerView('dividers', View);

    return View;
});