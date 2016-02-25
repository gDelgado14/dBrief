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

    defaultRoute: function() {
      this.authRoute();

      console.log('default route thing hahahahah');

    },

    authRoute: function() {

      // fires on every page
      console.log('testfunc called');

      var ref = new Firebase('https://dbrief.firebaseio.com'),
          auth = ref.getAuth();

      new AppView({ collection: Books });

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

        // Fire useless event yeyey
        Window.App.Vent.trigger('init');

        //
        new AppView({ collection: Books });


      }
    }

  });

  return BriefRouter
});
