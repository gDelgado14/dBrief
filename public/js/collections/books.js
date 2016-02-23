define([
  'underscore',
  'backbone',
  'models/book',
  'firebase',
  'backbonefire'
], function(_, Backbone, Book) {

  var BooksCollection = Backbone.Firebase.Collection.extend({

    model: Book,

    // save all of the books under the the 'books' node
    url: 'https://dbrief.firebaseio.com',

    initialize: function() {

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
  return new BooksCollection();

});
