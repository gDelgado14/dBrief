define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/register.html',
  'text!templates/signin.html',
], function($, _, Backbone, registerForm, signInForm) {

  // the top level piece of UI
  var FormView = Backbone.View.extend({

    className: 'module container',

    // compile book template
    //template: _.template(registerForm),

    events: {
      'click #get-signin-form': 'getSignInForm',
      'click #get-signup-form': 'getSignUpForm',
      'click #sign-in-req': 'signInReq',
      'click #register-req':  'registerReq'
    },

    initialize: function() {

      // create local ref to firebase roo
      this.ref = Window.App.ref;

      this.getSignUpForm();

    },


    getSignInForm: function() {
      // toggle between singup and signin
      this.$el.empty();
      this.$el.append(signInForm);
    },

    getSignUpForm: function() {
      // toggle between singup and signin
      console.log("get sign up form");
      this.$el.empty();
      this.$el.append(registerForm);
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
          Window.App.Vent.trigger("authed", authData.uid);
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

  }); // end FormView class declaration

  return FormView;

});
