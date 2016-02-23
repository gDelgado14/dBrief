requirejs.config({

  shim: {
    backbone: {
      deps: [
        'underscore',
        'jquery'
      ],
      exports: 'Backbone'
    },
    backbonefire: {
      deps: [
        'underscore',
        'backbone'
      ]
    },
    firebase: {
      exports: 'Firebase'
    }
  },

  paths: {
    jquery: '../bower_components/jquery-2.1.0.min/index',
    underscore: '../bower_components/underscore/underscore',
    backbone: '../bower_components/backbone/backbone',
    text: '../bower_components/text/text',
    firebase: '../bower_components/firebase/firebase-debug',
    backbonefire: '../bower_components/backbonefire/dist/backbonefire'
  }
});

require([
  'backbone',
  'underscore',
  'views/appview',
  'collections/books',
  'routers/router'
],
function(Backbone, _, AppView, Books, Workspace, Firebase) {
  // note that there may be load failures because dependancies havent
  // been explicitly specified in require.config
  // this is because all current js modules have AMD exports in their
  // definitions. Therefore assuming dependancies will resolve without
  // additional configuration.

  // baseUrl -- > 'js'

  /*
    TODO:
      - use animated loading icon while firebase fetches remote data
        - how to detect when firebase has finished fetching
  */
  window.App = {
    Vent: _.extend({}, Backbone.Events)
  };


  // pass instantiated Books collections
  // emtpy list of rendered models
  new AppView({ collection: Books });

  new Workspace();
  Backbone.history.start();

});
