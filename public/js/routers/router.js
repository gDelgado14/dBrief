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

    authRoute: function() {

      // fires on every page
      console.log('testfunc called');

      var ref = new Firebase('https://dbrief.firebaseio.com'),
          auth = ref.getAuth();

      if (auth) {
        console.log('user authenticated!');

        /*
        // tells us if we're at home page
        window.location.pathname === '/'
        if ()
        */



      } else {
        // render register.html

        // Fire useless event yeyey
        Window.App.Vent.trigger('init');


      }
    },

    defaultRoute: function() {
      this.authRoute();

      new AppView({ collection: Books });

      console.log('default route thing hahahahah');


    }

  });

  return BriefRouter
});
