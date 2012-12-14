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

        $buttonOn: null,
        $buttonOff: null,

        initialize: function () {
            _.bindAll(this);
            $buttonOn = this.$(this.selectorOn());
            $buttonOff = this.$(this.selectorOff());

            $buttonOn.on('click', this.onSwitchClickOn);
            $buttonOff.on('click', this.onSwitchClickOff);

            this.render();
        },

        events: {},

        render: function () {

            this.$el.buttonset();

            return this;
        },

        onSwitchClickOn: function () {
        },

        onSwitchClickOff: function () {
        },

        enable: function () {
            this.$el.attr('disabled', false);
        },

        disable: function () {
            this.$el.attr('disabled', true);
        },

        selectorOn: function () {
            return this.$el.selector + "_radio_on";
        },
        selectorOff: function () {
            return this.$el.selector + "_radio_off";
        },

        turnOn: function () {
            //            this.$(this.selectorOff()).attr('checked', false);
            this.$(this.selectorOn()).attr('checked', true);
        },

        turnOff: function () {
            this.$(this.selectorOff()).attr('checked', true);
            //          this.$(this.selectorOn()).attr('checked', false);
        },

        unselect: function () {
            this.$(this.selectorOn()).attr('checked', false);
            this.$(this.selectorOff()).attr('checked', false);
        },

        refresh: function () {
            this.$el.buttonset("refresh");
        },

        getValue: function () {
            return this.$(this.selectorOn()).is(':checked') == true;
        },

        save: function () {
        },

        load: function () {
            //this.$el.value("");
        }

    });

    View.prototype.createView = function (context, options, attributes) {
        var res = "";

        var c1 = "";
        var c2 = "";
        var checked = attributes['checked'] && (attributes['checked'] === '1');

        if (checked) {
            c1 = 'checked="checked"';
        }
        else {
            c2 = 'checked="checked"';
        }

        var elName = attributes['el'];

        res = '<span id="' + elName + '">' +
        '<input type="radio" name="' + elName + '_radio" id="' + elName + '_radio_off" ' + c1 + '/>' +
        '<label class="yesno" for="' + elName + '_radio_off" id="' + elName + '_off_label">OFF</label>' +
        '<input type="radio" name="' + elName + '_radio" id="' + elName + '_radio_on" ' + c2 + '/>' +
        '<label class="yesno" for="' + elName + '_radio_on" id="' + elName + '_on_label">ON</label>' +
        '</span>';

        // handlebars redering template
        return new Handlebars.SafeString(res);
    }

    HandlebarsView.registerView('onoff', View);

    return View;
});