define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/brief.html',
  'text!templates/section.html'
], function($, _, Backbone, brief, section) {

  // the top level piece of UI
  var ProjView = Backbone.View.extend({

    template: _.template(brief),

    events: {
      'keydown .brief-form-input': 'convertToHeader',
      //'keydown .section input':
      'click .converted-input': 'revertToInput',
      'click #add-section': 'addSection'
    },

    initialize: function(opts) {

      this.ref = Window.App.ref;
      this.briefKey = opts.briefId;

      if (this.briefKey) {

        this.ref.child('briefs/' + this.briefKey).once('value', function(snap) {

          if (snap.hasChild('sections')) {
            this.numSections = Object.keys(snap.val().sections).length;
          } else {
            this.numSections = 0;
          }

        }, function cancelCallback() {}, this);


      } else {
        this.numSections = 0;
      }



      //TODO: move node creation to a later part of the brief processData
      // too many 'undefined' nodes being created due to user
      // clicking on "New Project" but not naming the brief and then
      // leaving the page


      // create a new brief
      // push creates a unique id which is being saved by calling
      // .key()

      console.log("brief id: ", opts.briefId);



    },

    render: function() {

      console.log('render called');

      if (this.briefKey) {

        var briefRef = this.ref.child('briefs/' + this.briefKey);


        briefRef.on('value', function(snap){
          //this.template()
          console.log("current brief data ... ");
          console.log(snap.val());


          this.$el.html( this.template({
              briefData: snap.val()
            })
          );

        }, function cancelCallback() {}, this);


      } else {
        // create blank brief template for new brief
        this.$el.html( this.template({
            briefData: null
          })
        );
        this.numSections = 0;
      }

      return this;

    },

    convertToHeader: function(e) {

      // convert on enter keypress if input is not empty
    	if (e.which === 13 && $(e.target).val()) {

        var section = this.$(e.target),
            headerType = section.attr('data-tag'),
            sectionName = section.attr('data-name'),
            sectionID = section.closest('div').attr('data-section-num'),
            briefNode = null,
            briefsArr = [],
            updateNode = {};

          // replace with template
    		section.replaceWith(function() {
       		return '<' + headerType +' data-name="' + sectionName + '" data-tag="' + headerType + '" class="converted-input">' + section.val() + '</' + headerType+ '>'
    		});

        if (!this.briefKey && sectionName === 'BriefName') {
          this.addBriefKey(sectionName);
        }

        if (sectionName !== 'BriefName') {
          console.log(sectionID);

          updateNode.sections[sectionID] = section.val();
        } else {
          updateNode.BriefName = section.val();
        }

        briefNode = this.ref.child('briefs/' + this.briefKey);


        // might be necessary to retrieve briefnode data before updating
        /*
        // retrieve current data on brief
        briefNode.once('value', function (Snap) {
          briefsArr.push(snap.val());

        }, function (err) {
          if (err) {
            console.log("error retrieving data: ", err);
          }
        }); */

        // update brief data
        briefNode.update(updateNode, function(error) {
          if (error) {
            console.log("error updating brief node: ", error);
          }
        });

      }
    },

    revertToInput: function(e) {
      var section = this.$(e.target),
          headerType = section.attr('data-tag'),
          sectionName = section.attr('data-name');

      section.replaceWith(function() {
        return '<input data-name="' + sectionName + '" data-tag="' + headerType + '" class="brief-form-input" type="text" placeholder="Section Name" value="'+ section.html() + '">'
      });
    },

    addSection: function (e) {

      var tmp = _.template(section);

      this.$("#section-inject").append( tmp({
        num: this.numSections
      }) );
      //this.$el.append(section);

      this.numSections += 1;
    },

    addBriefKey: function(briefName) {
      // currently assuming that the header name being passed into the function
      // is the title of the brief
      var userNode = this.ref.child('users/' + Window.App.uid);

      this.briefKey = this.ref.child('briefs').push({
        BriefName: briefName
      }).key();

      // add reference to new brief to logged-in user
      userNode.once('value', function(snap) {

        var newBriefref = {},
            numBriefs;

        if (snap.val().briefs) {
          // make newBriefref key the number of current briefs
          // a user's briefs node is 0 indexed
          numBriefs = Object.keys(snap.val().briefs).length;
        } else {
          // begin the user's briefs node at index 0
          numBriefs = 0;
        }

        newBriefref[numBriefs] = this.briefKey;

        userNode.child('briefs').update(newBriefref);

      }, function(error) {
        console.log("error adding new brief reference to logged in user: ", error);
      }, this);

    }

  }); // end FormView class declaration

  return ProjView;

});
