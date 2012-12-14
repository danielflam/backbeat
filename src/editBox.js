define([
		'jquery',
		'underscore',
        'backbone',
        'handlebars',
        'components/view',
        'components/backbeat',
        'jqueryui/jquery.ui.core',
        'jqueryui/jquery.ui.widget',
        'jqueryui/jquery.ui.button'

        ],
function ($, _, Backbone, Handlebars, HandlebarsView) {

    var View = Backbone.View.extend({
        initialize: function () {
            _.bindAll(this);

            this.render();

        },

        events: {
            'change': 'onChange'
        },

        onChange: function (event, ui) {
        },

        render: function () {

            return this;
        },

        getValue: function () {
            return this.$el.val();
        },

        save: function () {
        },

        load: function () {
            //this.$el.value("");
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
    HandlebarsView.registerView('editbox', View);

    return View;
});