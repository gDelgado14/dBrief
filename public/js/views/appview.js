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

      // create local ref to firebase root
      this.ref = Window.App.ref;

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

      var uid = Window.App.uid;

      console.log("From Fetch Dash. UID is: ", uid);

      // clear current workspace
      if (this.formView) {
        this.formView.remove();
      } else if (this.projView) {
        this.projView.remove();
      }

      // this method might be redundant with view.remove()
      this.$el.empty();

      this.ref.child('users/' + uid).on('value', function(snap) {
        //Async callback
        Window.App.userData = snap.val();
      });

      this.dashView = new DashView(this.collection);

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

      // navigating is running authRoute, triggering authed event,
      // and looping back to dash.
      //this.router.navigate('brief/12');

      this.$el.html(this.projView.el);

    }



  }); // end AppView class declaration

  return AppView;

});
