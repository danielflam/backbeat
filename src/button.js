define([
		'jquery',
		'underscore',
        'backbone',
        'handlebars',
        'components/view',
        'components/backbeat',
        'jqueryui/jquery.ui.core',
        'jqueryui/jquery.ui.widget',
        'jqueryui/jquery.ui.button',
        'jqueryui/jquery.ui.mouse',
        'jqueryui/jquery.ui.sortable',
        'jqueryui/jquery.ui.draggable'

        ],
function ($, _, Backbone, Handlebars, HandlebarsView) {

    var View = Backbone.View.extend({
        initialize: function () {
            _.bindAll(this);

            this.render();
        },

        events: {
            'click': 'onClick'
        },
        onClick: function () {
        },

        render: function () {

            this.$el.button();

            return this;
        },

        enable: function () {
            this.$el.attr('disabled', false);
        },

        disable: function () {
            this.$el.attr('disabled', true);
        },

        refresh: function () {
            this.$el.button("refresh");
        }
    });

    View.prototype.createView = function (context, options, attributes) {
        var res = "";

        var elName = attributes['el'];
        var elCaption = attributes['caption'];

        res = '<a href="#" id="' + elName + '">' + elCaption + '</a>';

        // handlebars redering template
        return new Handlebars.SafeString(res);
    }

    HandlebarsView.registerView('button', View);

    return View;
});