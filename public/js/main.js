/*global require*/
'use strict';

// Require.js allows us to configure shortcut alias
require.config({
	// The shim config allows us to configure dependencies for
	// scripts that do not call define() to register a module
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: [
				'underscore',
				'jquery'
			],
			exports: 'Backbone'
		},

		/* Foundation */
		'foundation.core': {
        deps: [
        'jquery',
        'modernizr'
        ],
        exports: 'Foundation'
    },
    'foundation.abide': {
        deps: [
        'foundation.core'
        ]
    },
    'foundation.accordion': {
        deps: [
        'foundation.core'
        ]
    },
    'foundation.dropdown': {
        deps: [
        'foundation.core'
        ]
    },
    'foundation.equalizer': {
        deps: [
        'foundation.core'
        ]
    },
    'foundation.interchange': {
        deps: [
        'foundation.core'
        ]
    },
    'foundation.magellan': {
        deps: [
        'foundation.core'
        ]
    },
    'foundation.offcanvas': {
        deps: [
        'foundation.core'
        ]
    },
    'foundation.orbit': {
        deps: [
        'foundation.core'
        ]
    },
    'foundation.reveal': {
        deps: [
        'foundation.core'
        ]
    },
    'foundation.tabs': {
        deps: [
        'foundation.core'
        ]
    },
    'foundation.tooltip': {
        deps: [
        'foundation.core'
        ]
    }
	},
	paths: {
		jquery: '../bower_components/jquery/dist/jquery.min',
		underscore: '../bower_components/underscore/underscore-min',
		backbone: '../bower_components/backbone/backbone',
		text: '../bower_components/requirejs-text/text',
		firebase: '../bower_components/firebase/firebase',
		backbonefire: 'backbonefire',
		modernizr: '../bower_components/modernizr-built/dist/modernizr.min',

		/* Foundation */
		'foundation.core': '../bower_components/foundation-sites/js/foundation.core',
    'foundation.abide': '../bower_components/foundation-sites/js/foundation.abide',
    'foundation.accordion': '../bower_components/foundation-sites/js/foundation.accordion',
    'foundation.dropdown': '../bower_components/foundation-sites/js/foundation.dropdown',
    'foundation.equalizer': '../bower_components/foundation-sites/js/foundation.equalizer',
    'foundation.interchange': '../bower_components/foundation-sites/js/foundation.interchange',
    'foundation.magellan': '../bower_components/foundation-sites/js/foundation.magellan',
    'foundation.offcanvas': '../bower_components/foundation-sites/js/foundation.offcanvas',
    'foundation.orbit': '../bower_components/foundation-sites/js/foundation.orbit',
    'foundation.reveal': '../bower_components/foundation-sites/js/foundation.reveal',
    'foundation.tabs': '../bower_components/foundation-sites/js/foundation.tabs',
    'foundation.tooltip': '../bower_components/foundation-sites/js/foundation.tooltip'
	}
});

require([
	'backbone',
	'jquery',
	'foundation.core'
], function (Backbone, $) {
	/*jshint nonew:false*/
	// Initialize routing and start Backbone.history()
	// info on templates: https://github.com/requirejs/text
	/*$(document).foundation(function() {

			Backbone.history.start();
	});*/

	console.log("hhe");

});


/*

require([
	'backbone',
	'views/app',
	'routers/router',
	'collections/todos'
], function (Backbone, AppView, Workspace, Todos) {
	/*jshint nonew:false
	// Initialize routing and start Backbone.history()
	// info on templates: https://github.com/requirejs/text
	console.log("yeee");
	Backbone.history.start();
});


*/
