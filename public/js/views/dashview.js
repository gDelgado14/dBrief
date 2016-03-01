define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/dashboard.html'
], function($, _, Backbone, dashboard) {

  // the top level piece of UI
  var DashView = Backbone.View.extend({

    template: _.template(dashboard),

    className: 'module container',

    events: {
      'click .new-project-btn': 'newProj',
      'click .button-primary': 'renderBrief'
    },

    initialize: function() {

      // create local ref to firebase roo
      this.ref = Window.App.ref;

      console.log('fetch dash called');

    },

    newProj: function() {
      // when "new project" clicked, publish event
      Window.App.Vent.trigger('newProj', null);
    },

    renderBrief: function(e) {

      Window.App.Vent.trigger('getBrief', this.$(e.target).attr("data-id"));

    },

    render: function() {

      console.log('render called');

      var userRef = this.ref.child('users/' + Window.App.uid),
          briefs = null,
          self = this,
          renderInfo = null;

      userRef.on('value', function(snap) {

        if (snap.hasChild('briefs')) {
          var briefRef = self.ref.child('briefs'),
          briefs = [];

          renderInfo = {};

          snap.child('briefs').forEach(function(userBrief) {

            briefs.push(userBrief.val());

          });

          console.log('briefs array ...');

          console.log(briefs);

          // once we know what briefs belong to current user
          // fetch data on those briefs for rendering purposes
          briefRef.once('value', function(snap) {

            snap.forEach(function(brief) {
              if ( briefs.indexOf(brief.key()) > -1 ) {
                renderInfo[brief.key()] = brief.val().BriefName;
              }
            });

            self.$el.html(self.template({
              briefs: renderInfo,
              keys: Object.keys(renderInfo)
            }));
          });
        } else {
          self.$el.html(self.template({
            briefs: null,
            keys: null
          }));
        }

      });

      return this;
    }

  }); // end FormView class declaration

  return DashView;

});
