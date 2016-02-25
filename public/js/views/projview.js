define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/brief.html',
], function($, _, Backbone, brief) {

  // the top level piece of UI
  var ProjView = Backbone.View.extend({

    className: 'module container',

    events: {},

    initialize: function() {

      // create local ref to firebase roo
      this.ref = Window.App.ref;

      this.fetchBrief();

    },

    fetchBrief: function() {
      this.$el.html(brief);
    }

  }); // end FormView class declaration

  return ProjView;

});
