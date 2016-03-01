define([
  'jquery',
  'backbone',
  'firebase'
], function($, Backbone, Firebase) {

  var BriefRouter = Backbone.Router.extend({

    // TODO:
    //  - get auth data for all routes and rout accordingly

    routes: {
      '*actions': 'authRoute'
    },

    initialize: function () {

      this.ref = Window.App.ref;
      this.currentView = null;
      // is this even necessary?
      //new AppView();

      // listen to events so that the route may be updated

      this.$container = $('#app-container');


      Window.App.Vent.on("authed", this.dashRoute, this);
      Window.App.Vent.on("newProj", this.getBriefRoute, this);
      Window.App.Vent.on("getBrief", this.getBriefRoute, this);

    },

    authRoute: function() {
      // ensure user is authenticated at all stages
      // if user goes to `/` then route to dahsboard

      console.log('authRoute called');

      var auth = this.ref.getAuth(),
          self = this;

      if (auth && !Window.App.uid) {
        console.log('user: ', auth.uid);

        Window.App.uid = auth.uid;
        /*
        // tells us if we're at home page
        window.location.pathname === '/'
        if ()
        */

        // might not be necessary
        Window.App.Vent.trigger("authed");

      } else {
        // render register.html
        console.log("user is unauthenticated ... ");
        // Fire useless event yeyey
        // Window.App.Vent.trigger('init');

        require(["views/formview"], function (FormView) {
          if (self.currentView) {
              self.currentView.remove();
          }

          self.currentView = new FormView();
          self.$container.html(self.currentView.render().el);

        });

      }
    },

    dashRoute: function() {
      var self = this;

      require(["views/dashview"], function (DashView) {
        if (self.currentView) {
            self.currentView.remove();
        }

        self.currentView = new DashView();
        self.$container.html(self.currentView.render().el);

      });
    },

    getBriefRoute: function(id) {
      var self = this;

      console.log(id);

      require(["views/projview"], function (BriefView) {
        if (self.currentView) {
            self.currentView.remove();
        }

        self.currentView = new BriefView({briefId: id});
        self.$container.html(self.currentView.render().el);

      });

      console.log('new brief');
    }



  });

  return BriefRouter
});
