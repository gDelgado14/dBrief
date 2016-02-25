define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/register.html',
  'text!templates/signin.html',
  'firebase'
], function($, _, Backbone, registerForm, signInForm, Firebase) {

  // the top level piece of UI
  var AppView = Backbone.View.extend({

    // bind the bookview to an existing DOM element
    el: '#app-container',

    // compile book template
    //template: _.template(registerForm),

    events: {
      'click #get-signin-form': 'getSignInForm',
      'click #get-signup-form': 'getSignUpForm',
      'click #sign-in-req': 'signInReq',
      'click #register-req':  'registerReq'
    },

    initialize: function() {

      // add event listener. Render once books have been fetched
      // FIX: sync event seems to be firing on call to fetched
      // and once client receives data
      //this.listenTo(this.collection, 'sync', this.render);

      this.ref = new Firebase('https://dbrief.firebaseio.com');

      // no call to fetch is required, and any calls to fetch will be ignored
      // this.collection.fetch();

      // render newly-added model
      // backbonefire automatically syncs new model
      this.listenTo(this.collection, 'loaded', this.render);

      Window.App.Vent.on("authed", this.fetchBriefs);

      // on init (from router), call getSignUpForm and pass the view as context for this
      //Window.App.Vent.on('init', this.getSignUpForm, this);



      // note: firebase uses 'collection.add' for each model
      this.getSignUpForm();


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

    getSignInForm: function() {
      // toggle between singup and signin
      this.$('#test-insertion-point').html(signInForm);
    },

    getSignUpForm: function() {
      // toggle between singup and signin
      this.$('#test-insertion-point').html(registerForm);
    },

    signInReq: function signInReq() {
      //named function for the sake of debugging

      var em = this.$('#emailInput').val(),
          ps = this.$('#passInput').val();

      console.log("email: ", em);
      console.log("pass: ", ps);

      this.ref.authWithPassword({
        email: em,
        password: ps
      }, function(error, authData) {
        if (error) {
          console.log("Login Failed! ", error);
        } else {
          console.log("Authenticated successfully with payload: ", authData);
          Window.App.Vent.trigger("authed");
        }
      });

    },

    registerReq: function registerReq() {
      //named function for the sake of debugging

      var self = this,
          em = self.$('#emailInput').val(),
          ps = self.$('#passInput').val();

      self.ref.createUser({
        email: em,
        password: ps
      }, function(error, userData) {

        if (error) {
          switch (error.code) {
            case "EMAIL_TAKEN":
              console.log("The new user account cannot be created because the email is already in use.");
              break;
            case "INVALID_EMAIL":
              console.log("The specified email is not a valid email.");
              break;
            default:
              console.log("Error creating user:", error);
            }
        } else {
          console.log("Successfully created user account with uid:", userData.uid);
          // sign user in once account created
          self.signInReq();
        }

      });
    },

    fetchBriefs: function() {
      console.log('FETCHING BRIEFS BABY');
    }

  }); // end AppView class declaration

  return AppView;

});
