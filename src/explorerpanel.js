define([
		'jquery',
		'underscore',
        'backbone',
        'handlebars',
        'components/view',
        'components/backbeat',
        'jqueryui/jquery.ui.core',
        'jqueryui/jquery.ui.mouse',
        'jqueryui/jquery.ui.widget',
	    'jqueryui/jquery.ui.effect',
	    'jqueryui/jquery.ui.effect-blind',
	    'jqueryui/jquery.ui.selectable'
        ],
function ($, _, Backbone, Handlebars, HandlebarsView) {

    var View = Backbone.View.extend({
        initialize: function () {
            _.bindAll(this);

            this.render();

        },

        stop: function (event) {

            // alert(event.target);
            var result = $(this.$el.selector + "_right").empty();
            $(".ui-selected", this.$el).each(function () {
                //var index = $("#selectable li").index(this);
                //result.append(" #" + (index + 1));
                var id = "#" + this.id + "_content";
                //alert(id);
                result.append($(id).html());
            });
        },
        //remove: function () {
        // unbind the namespaced event (to prevent accidentally unbinding some
        // other resize events from other code in your app
        //$(window).off("resize.app");

        // don't forget to call the original remove() function
        //Backbone.View.prototype.remove.call(this);
        //},

        render: function () {
            this.$el.selectable({ stop: this.stop });

            //_.defer(this.initResize);

            return this;
        } //,
        //initResize: function () {
        //$(window).on("resize.app", _.bind(this.resize, this));
        //},
        //resize: function () {
        //this.$el.maccordion("resize");
        // }

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

        var s = "<div class='explorerpanel_main'>" +
        "<div class='explorerpanel_left' id='" + attributes['el'] + "_left'>" +
            "<ol class='explorerpanel_ol' id='" + attributes['el'] + "'>" + fnres + "</ol>" +
        "</div>" +
        "<div class='explorerpanel_right' id='" + attributes['el'] + "_right'>Click on username to see options</div>" +
        "</div>";
        return s;
    }

    HandlebarsView.registerView('explorerpanel', View);

    Handlebars.registerHelper('explorerpanelsection', function (options) {
        var title = options.hash['title'];

        var fn = null;
        if (options && options.fn)
            fn = options.fn;
        else if (this.fn)
            fn = this.fn;
        var fnres = fn ? fn(this) : "";

        var s = '<li id="epsection_' + options.hash['id'] + '" class="ui-widget-content">' + title + '</li><div style="display: none" id="epsection_' + options.hash['id'] + '_content">' + fnres + "</div>";
        return s;
    });

    return View;
});