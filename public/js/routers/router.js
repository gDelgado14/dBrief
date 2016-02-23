define([
  'jquery',
  'backbone',
  'firebase'
], function($, Backbone, Firebase) {

  var BriefRouter = Backbone.Router.extend({

    // TODO:
    //  - get auth data for all routes and rout accordingly

    routes: {
      '': 'testFunc'
    },

    testFunc: function() {
      //
      console.log('testfunc called');

      var ref = new Firebase('https://dbrief.firebaseio.com'),
          auth = ref.getAuth();

      if (auth) {
        console.log('user authenticated!');
      } else {
        // render register.html

        window.App.Vent.trigger('init');


      }
    }

  });

  return BriefRouter
});
