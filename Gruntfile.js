// ---
// Grunt.js Build configuration

// From the root of your project, run `grunt release` to build the files in production mode.
// For debugging purpose, use `grunt debug` to prevent minification of CSS and JS scripts files.
// During developpement, use `grunt watch:compass` to compile SCSS files on changes and use
// `grunt watch:scripts` to watch changes and build a debuggable version of your scripts.

// This is the main application configuration file.  It is a Grunt
// configuration file, which you can learn more about here:
// https://github.com/cowboy/grunt/blob/master/docs/configuring.md

/*global module */
module.exports = function( grunt ) {
	"use strict";

	grunt.initConfig({
		
		// Compile SCSS files to CSS
		// Two config are available, `dev` will produce a source map with the code to be use with fire-sass
		// or Chrome devtools. `prod` compress and minify the code
		compass: {
			options: {
				sassDir   : 'www/public/assets/sass',
				cssDir    : 'www/public/assets/css',
				imagesDir : 'www/public/assets/img'
			},
			prod: {},
			watch: { options: { watch: true } }
		},
		
		// Watch task checks for files changes, then execute the defined task
		watch: {
			compass: {
				files: ['www/public/assets/sass/**/*'],
				tasks: ['compass:dev']
			}
		}
		
	});
	
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-watch');

};
