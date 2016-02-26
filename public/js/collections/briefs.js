define([
  'underscore',
  'backbone',
  'models/brief',
  'firebase',
  'backbonefire'
], function(_, Backbone, Brief) {

  var BriefsCollection = Backbone.Firebase.Collection.extend({

    model: Brief,

    // pass a url param into collection instantiation
    // urls will have user's uid and find array of brief id's
    // that user has access to
    //https://dbrief.firebaseio.com/users/ec5b4cd4-b7e4-40cc-a9f2-41fd95328635

    initialize: function(props) {
      console.log(props);
      this.url = props.url

        // collection fires a 'sync' event AFTER all remote
        // data has been retrieved from this.url
        // 'sync' event passes the collection
        this.on('sync', function(collection) {

          // publish loaded event to view for rendering purposes
          this.trigger('loaded', collection);
        });
    }

  });

  // passing an instance of BooksCollection to BooksView
  return BriefsCollection;

});
