define([
		'jquery',
		'underscore',
        'backbone',
        'handlebars',
        'components/view',
        'components/backbeat',
	    'dataTables/jquery.dataTables'
        ],
function ($, _, Backbone, Handlebars, HandlebarsView) {

    var View = Backbone.View.extend({
        initialize: function () {
            _.bindAll(this);

            this.render();

        },

        render: function () {
            var additionalOptions = {};

            _.each(this.options.templateAttributes,
                 function (value, key) {
                     if (_.contains(['bPaginate', 'bLengthChange', 'bFilter', 'bSort', 'bInfo', 'bAutoWidth', 'sPaginationType'], key)) {
                         additionalOptions[key] = value;
                     }
                 }, this);

            this.$el.dataTable(additionalOptions);

            //_.defer(this.initResize);

            return this;
        } //
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

        var s = "<table class='display' id='" + attributes['el'] + "'>" + fnres + "</table>";
        return s;
    }

    HandlebarsView.registerView('datatable', View);

    Handlebars.registerHelper('datatablehead', function (options) {

        var fn = null;
        if (options && options.fn)
            fn = options.fn;
        else if (this.fn)
            fn = this.fn;
        var fnres = fn ? fn(this) : "";

        var s = "<thead><tr>" + fnres + "</tr></thead>";

        return s;
    });

    Handlebars.registerHelper('datatablefoot', function (options) {

        var fn = null;
        if (options && options.fn)
            fn = options.fn;
        else if (this.fn)
            fn = this.fn;
        var fnres = fn ? fn(this) : "";

        var s = "<tfoot><tr>" + fnres + "</tr></tfoot>";
        return s;
    });

    Handlebars.registerHelper('datatableheadercell', function (context, options) {
        if (!options) {
            options = context;
        }

        //var fn = null;
        //if (options && options.fn)
        //    fn = options.fn;
        //else if (this.fn)
        //    fn = this.fn;
        //var fnres = fn ? fn(this) : null;

        var optClass = "";
        //        if (options && options.hash && options.hash['class']) {
        //            optClass = " " + Handlebars.makeElement("class", options.hash['class']);
        //        }

        var s = "<th>" + (context ? context : "") + "</th>";
        return new Handlebars.SafeString(s);
    });

    Handlebars.registerHelper('datatablebody', function (options) {

        var fn = null;
        if (options && options.fn)
            fn = options.fn;
        else if (this.fn)
            fn = this.fn;
        var fnres = fn ? fn(this) : "";

        var s = "<tbody>" + fnres + "</tbody>";
        return s;
    });

    Handlebars.registerHelper('datatablerow', function (options) {

        var fn = null;
        if (options && options.fn)
            fn = options.fn;
        else if (this.fn)
            fn = this.fn;
        var fnres = fn ? fn(this) : "";

        var s = "<tr>" + fnres + "</tr>";
        return s;
    });

    Handlebars.registerHelper('datatablecell', function (context, options) {
        if (!options) {
            options = context;
        }

        //var fn = null;
        //if (options && options.fn)
        //    fn = options.fn;
        //else if (this.fn)
        //    fn = this.fn;
        //var fnres = fn ? fn(this) : null;

        var optClass = "";
        if (options && options.hash && options.hash['class']) {
            optClass = " " + Handlebars.makeElement("class", options.hash['class']);
        }

        if (options && options.hash && options.hash['style']) {
            optClass += " " + Handlebars.makeElement("style", options.hash['style']);
        }

        var s = new Handlebars.SafeString("<td" + optClass + ">" + (context ? context : "") + "</td>");
        //var s = "<td" + optClass + ">" + context + "</td>";

        return s;
    });

    return View;
});