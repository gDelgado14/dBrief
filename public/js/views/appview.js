define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/register.html',
  'text!templates/signin.html',
  'text!templates/brief.html',
  'text!templates/btn.html'
], function($, _, Backbone, registerForm, signInForm, briefTemp, btn) {

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

      // create local ref to firebase roo
      this.ref = Window.App.ref;

      // no call to fetch is required, and any calls to fetch will be ignored
      // this.collection.fetch();

      // listen to router triggers
      // pass this as 3rd arg for context
      Window.App.Vent.on("authed", this.fetchDash, this);
      Window.App.Vent.on('init', this.getSignUpForm, this);

      // *************************************************************************************
      // RATHER THAN RENDERING FORM TEMPLATES FROM APP VIEW ... INSTANTIATE A FORM VIEW
      // https://addyosmani.com/backbone-fundamentals/#working-with-nested-views
      // *************************************************************************************

    },

    render: function(collection) {

      console.log('render called....');

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
          firstName = self.$('#firstInput').val(),
          lastName = self.$('#lastInput').val(),
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

          // get a reference to "users" node
          var usersRef = self.ref.child("users"),
          userInfo = {};

          // create reference of user in user node
			    // Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"
          userInfo[userData.uid] = {
            first: firstName,
            last: lastName,
            email: em
          };

          // add newly created user record to "users" node
      		usersRef.update(userInfo);

          // sign user in once account created
          self.signInReq();
        }

      });
    },

    fetchDash: function() {
      this.$('#test-insertion-point').html(btn);
    }

  }); // end AppView class declaration

  return AppView;

});
