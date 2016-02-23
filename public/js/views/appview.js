define([
  'jquery',
  'underscore',
  'backbone',
  'models/book',
  'text!templates/register.html'
], function($, _, Backbone, Book, registerForm) {

  // the top level piece of UI
  var AppView = Backbone.View.extend({

    // bind the bookview to an existing DOM element
    el: '#app-container',

    // compile book template
    //template: _.template(registerForm),

    events: {},

    initialize: function() {

      // add event listener. Render once books have been fetched
      // FIX: sync event seems to be firing on call to fetched
      // and once client receives data
      //this.listenTo(this.collection, 'sync', this.render);

      // no call to fetch is required, and any calls to fetch will be ignored
      // this.collection.fetch();

      // render newly-added model
      // backbonefire automatically syncs new model
      this.listenTo(this.collection, 'loaded', this.render);

      Window.App.Vent.on('init', initApp);

      // no need to call render directly
      // firebase uses 'collection.add' for each model
      //this.render();

    },

    render: function(collection) {

      console.log('render called....');
      //var template = this.template;
      /*
      if (collection.length > 0) {

        var list = this.$('#book-list');
        var self = this;

        collection.forEach(function(model) {
            //debugger;
            //self.rendered.push(model.id);
            // if the model hasn't been rendered
            //if (!self.$.inArray(model.id, self.rendered)) {
              list.append( template(model.attributes) );
            //}

        });


      }*/

      // begin listening to collection 'add' methods only once
      // all models have been loaded from firebase
      // backbonefire fires 'add' event for each model
      this.listenTo(this.collection, 'add', this.render);

    },

    initApp: function() {
      console.log('initapp called!!!');
      this.$('#test-insertion-point').html(registerForm);
    }

  });

  return AppView;
});
