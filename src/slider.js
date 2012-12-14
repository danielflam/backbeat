define([
		'jquery',
		'underscore',
        'backbone',
        'handlebars',
        'components/view',
        'components/backbeat',
        'jqueryui/jquery.ui.core',
        'jqueryui/jquery.ui.widget',
        'jqueryui/jquery.ui.slider',
        'jqueryui/jquery.ui.mouse',
        'jqueryui/jquery.ui.sortable',
        'jqueryui/jquery.ui.draggable'

        ],
function ($, _, Backbone, Handlebars, HandlebarsView) {

    var View = Backbone.View.extend({
        $editor: null,
        initialize: function () {
            _.bindAll(this);

            var selector = this.$el.selector + "_edit";
            this.$editor = $(selector);

            this.render();
        },

        render: function () {
            var hash = this.options.templateAttributes;

            var options = {
                range: hash['range'] || 'min',
                slide: this.onSlide
            };
            if (hash['min']) {
                options = _.extend(options, { min: hash['min'] });
            }
            if (hash['max']) {
                options = _.extend(options, { max: hash['max'] });
            }
            if (hash['value']) {
                options = _.extend(options, { value: hash['value'] });
            }

            this.$el.slider(options);

            this.$editor.val(this.$el.slider("value"));
            this.$editor.on("change", this.onEditorChange);
            return this;
        },

        onSlide: function (event, ui) {
            this.$editor.val(ui.value);
            this.onChange(ui.value);
        },

        onEditorChange: function (event, ui) {
            var val = this.$editor.val();
            this.setValue(val);
            this.onChange(val);
        },

        onChange: function (val) {

        },

        refresh: function () {
            //    this.$el.slider("refresh");
        },

        setValue: function (val) {
            if (val < this.$el.slider("option", "min"))
                val = this.$el.slider("option", "min");
            if (val > this.$el.slider("option", "max"))
                val = this.$el.slider("option", "max");

            this.$el.slider("value", val);
            // reset the value
            this.$editor.val(val);
        },

        getValue: function () {
            return this.$el.slider("value", val);
        },

        save: function () {
        },

        load: function () {
            //this.$el.value("");
        }
    });

    View.prototype.createView = function (context, options, attributes) {

        var elName = attributes['el'];
        var label = attributes['label'] || 'Select';

        res = '<p>' +
            '<label for="amount">' + label + '</label>' +
            '<input type="text" id="' + elName + '_edit" style="margin-left: 10px; border: 0; color: #f6931f; font-weight: bold;" />' +
             '</p>' +
             '<div id="' + elName + '"></div>';

        // handlebars redering template
        return new Handlebars.SafeString(res);
    }

    HandlebarsView.registerView('slider', View);

    return View;
});