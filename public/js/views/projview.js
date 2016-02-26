define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/brief.html',
], function($, _, Backbone, brief) {

  // the top level piece of UI
  var ProjView = Backbone.View.extend({

    className: 'module container',

    events: {
      'keydown .brief-form-input': 'convertToHeader',
      'click #converted-input': 'revertToInput',
      'unfocus': 'convertToHeader'
    },

    initialize: function() {

      // create local ref to firebase roo
      this.ref = Window.App.ref;

      this.briefKey = this.ref.child('briefs').push({
        testing: "this will be brief data"
      }).key();

      console.log('brief key: ', this.briefKey);

      this.fetchBrief();

    },

    fetchBrief: function() {
      this.$el.html(brief);
    },

    convertToHeader: function(e) {

      // convert on enter keypress
    	if (e.which === 13) {

        var section = this.$(e.target),
            headerType = section.attr('data-tag'),
            testNode = 'test title';

    		section.replaceWith(function() {
       		return '<' + headerType +' data-tag="' + headerType + '" id="converted-input">' + section.val() + '</' + headerType+ '>'
    		});

        //update brief info

        /*
        switch (headerType) {
          case "h1":
            // something
            break;
          case "INVALID_EMAIL":
            console.log("The specified email is not a valid email.");
            break;
          default:
            console.log("Error creating user:", error);
        }*/

        this.ref.child('briefs/' + this.briefKey).update({
          testNode: section.val()
        }, function(error) {
          if (error) {
            console.log("error updating brief node: ", error);
          }
        });
      }
    },

    revertToInput: function(e) {
      var section = this.$(e.target),
          headerType = section.attr('data-tag');;

      section.replaceWith(function() {
        return '<input data-tag="' + headerType + '" class="brief-form-input" type="text" placeholder="Section Name" value="'+ section.html() + '">'
      });
    }

  }); // end FormView class declaration

  return ProjView;

});
