define([
  'jquery',
  'backbone',
  'collections/books',
  'views/appview',
  'firebase'
], function($, Backbone, Books, AppView, Firebase) {

  var BriefRouter = Backbone.Router.extend({

    // TODO:
    //  - get auth data for all routes and rout accordingly

    routes: {
      '': 'defaultRoute',
      '*actions': 'authRoute'
    },

    initialize: function () {
      // there should be
    },

    defaultRoute: function() {
      // check authentication state
      this.authRoute();

      console.log('default route thing hahahahah');

    },

    authRoute: function() {

      // fires on every page
      console.log('testfunc called');

      var ref = Window.App.ref,
          auth = ref.getAuth();



      if (auth) {
        console.log('user: ', auth.uid);

        /*
        // tells us if we're at home page
        window.location.pathname === '/'
        if ()
        */

        Window.App.Vent.trigger("authed");

      } else {
        // render register.html
        console.log("trigger init ... ");
        // Fire useless event yeyey
        Window.App.Vent.trigger('init');


      }
    }

  });

  return BriefRouter
});
