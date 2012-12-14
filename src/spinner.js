define([
		'jquery',
		'underscore',
        'backbone',
        'handlebars',
        'components/view',
        'components/backbat',
        'jqueryui/jquery.ui.core',
        'jqueryui/jquery.ui.widget',
        'jqueryui/jquery.ui.spinner'

        ],
function ($, _, Backbone, Handlebars, HandlebarsView) {

    var View = Backbone.View.extend({
        initialize: function () {
            _.bindAll(this);

            this.render();
            this.$el.on('change', this.onChange);
        },

        render: function () {
            this.$el.spinner();

            return this;
        },

        onChange: function (event, ui) {

        },

        getValue: function () {
            return this.$el.spinner("value");
        },

        save: function () {
        },

        load: function () {
        }
    });

    View.prototype.createView = function (context, options, attributes) {

        var elName = attributes['el'];
        var value = attributes['value'] || "";

        return new Handlebars.SafeString(
                "<input class='ui-editbox' type='text' name='" + elName + "' id='" + elName + "' value='" + value + "' />"
            );
    }

    // can be accessed as {{editbox context ...}} or {{view context handler="editBox" ...}}
    HandlebarsView.registerView('spinner', View);

    return View;
});