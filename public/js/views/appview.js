define([
  'jquery',
  'underscore',
  'backbone',
  'routers/router',
  'views/formview',
  'views/dashview',
  'views/projview'
], function($, _, Backbone, Router, FormView, DashView, ProjView) {

  // the top level piece of UI
  var AppView = Backbone.View.extend({

    // bind the app to an existing DOM element
    el: '#app-container',

    events: {},

    initialize: function() {

      // add event listener. Render once books have been fetched
      // FIX: sync event seems to be firing on call to fetched
      // and once client receives data
      //this.listenTo(this.collection, 'sync', this.render);

      // create local ref to firebase roo
      this.ref = Window.App.ref;



      // no call to fetch is required, and any calls to fetch will be ignored
      // this.collection.fetch();

      // listen to router / view triggers
      // pass this as 3rd arg for context
      Window.App.Vent.on("authed", this.fetchDash, this);
      Window.App.Vent.on("init", this.getForms, this);
      Window.App.Vent.on("newProj", this.newProj, this);


      // *************************************************************************************
      // RATHER THAN RENDERING FORM TEMPLATES FROM APP VIEW ... INSTANTIATE A FORM VIEW
      // https://addyosmani.com/backbone-fundamentals/#working-with-nested-views
      // *************************************************************************************

      // instantiate the router
      this.router = new Router();
      Backbone.history.start();
    },

    render: function(collection) {},

    getForms: function() {
      this.$el.empty();

      this.formView = new FormView();

      this.$el.html(this.formView.el);
    },

    fetchDash: function() {

      // clear current workspace
      if (this.formView) {
        this.formView.remove();
      } else if (this.projView) {
        this.projView.remove();
      }

      // this method might be redundant with view.remove()
      this.$el.empty();

      this.dashView = new DashView();

      this.$el.html(this.dashView.el);
    },

    newProj: function() {

      // clear current workspace
      if (this.formView) {
        this.formView.remove();
      } else if (this.dashView) {
        this.dashView.remove();
      }

      this.$el.empty();

      this.projView = new ProjView();

      this.$el.html(this.projView.el);

    }



  }); // end AppView class declaration

  return AppView;

});
