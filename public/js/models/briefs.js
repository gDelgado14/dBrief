define([
  'underscore',
  'backbone'
], function(_, Backgone) {

  var Brief = Backbone.Model.extend({

    // books will have a link to an src
    //  ie amazon, wikipedia, or other
    //
    //  assume book is unread unless specified otherwise
    defaults: {}

  });

  return Brief;
});
