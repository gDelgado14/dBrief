define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/btn.html'
], function($, _, Backbone, btn) {

  // the top level piece of UI
  var DashView = Backbone.View.extend({

    className: 'module container',

    events: {
      'click .new-project-btn': 'newProj'
    },

    initialize: function() {

      // create local ref to firebase roo
      this.ref = Window.App.ref;

      this.fetchDash();

    },

    fetchDash: function() {
      this.$el.html(btn);

    },

    newProj: function() {
      // when "new project" clicked, publish event
      Window.App.Vent.trigger('newProj');
    }

  }); // end FormView class declaration

  return DashView;

});
