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
		
		// The clean task ensures all files are removed from the dist/ directory so
		// that no files linger from previous builds.
		clean: {
			all: [
				"dist/",
				"www/app/app_build.js"
			],
			build: [
				"dist/"
			]
		},
		
		// The lint task will run the build configuration and the application
		// JavaScript through JSHint and report any errors.  You can change the
		// options for this task, by reading this:
		// https://github.com/cowboy/grunt/blob/master/docs/task_lint.md
		lint: {
			files: [
				"www/app/**/*.js"
			]
		},
		
		jshint: {
			options: {
				browser: true,
				scripturl: true,
				smarttabs: true,
				expr: true
			}
		},
		
		// Smushit task will compress images through yahoo smushit services
		img: {
			compile: {
				src: "www/assets/img"
			}
		},
		
		// Compile SCSS files to CSS
		// Two config are available, `dev` will produce a source map with the code to be use with fire-sass
		// or Chrome devtools. `prod` compress and minify the code
		compass: {
			dev: {
				src: 'www/assets/sass',
				dest: 'www/assets/css',
				forcecompile: true,
				debugsass: true,
				images: 'www/assets/img',
				relativeassets: true
			},
			prod: {
				src: 'www/assets/sass',
				dest: 'www/assets/css',
				outputstyle: 'compressed',
				forcecompile: true,
				debugsass: false,
				images: 'www/assets/img',
				relativeassets: true
			}
		},
		
		// The `jst` and `handlebars` task pre-compile template to save CPU on production
		
		// `jst`: compile underscore.js templates
		jst: {
			compile: {
				options: {
					processName: function( filename ) {
						// normalize filename
						return filename.replace( 'www/', '' );
					}
				},
				files: {
					"dist/debug/templates.js": [ "www/app/templates/**/*.html" ]
				}
			}
		},
		
		// `handlebars`: compile Handlebars templates
		handlebars: {
			compile: {
				options: {
					processName: function( filename ) {
						// normalize filename
						return filename.replace( 'www/', '' );
					}
				},
				files: {
					"dist/debug/templates.js": [ "www/app/templates/**/*.html" ]
				}
			}
		},
		
		// `concat` task is used to concatenate multiple files into one.
		concat: {
			dist: {
				src: [
					"www/assets/js/libs/require.js",
					"dist/debug/templates.js",
					"dist/debug/app.js"
				],
				
				dest: "www/app/app_build.js",
				
				separator: ";"
			}
		},
		
		// Minify javascript files (through Uglify.js)
		min: {
			"www/app/app_build.js": [ "www/app/app_build.js" ]
		},
		
		// `requirejs` task use `r.js` builde and optimizer tool for AMD modules
		requirejs: {
			compile: {
				options: {
					baseUrl: "www/app/",
					
					// Include the main configuration file.
					mainConfigFile: "www/app/config.js",
					
					// Output file.
					out: "dist/debug/app.js",
					
					// Root application module.
					name: "config",
					
					paths: {
						
						// Set FB path to empty so it's ignored by the build
						facebook: "empty:",
						
						// Only replace Handlebars with the runtime if you're not loading templates after build
						handlebars  : "../assets/js/libs/handlebars.runtime", // v 1.0.beta.6
						
					},
					
					// Includes script to inline
					include: [
						
					],
					
					// Exclude all deps depending on a third party script
					excludeShallow: [
						"facebook"
					],
					
					// Do not wrap everything in an IIFE.
					wrap: {
						// set baseUrl config if concat is used
						start: 'require.config({ baseUrl: "app/", waitSeconds: 30 });',
						end: ' '
					},
					
					preserveLicenseComments: false
				}
			}
		},
		
		// Running the server without specifying an action will run the defaults,
		// port: 8000 and host: 127.0.0.1.  If you would like to change these
		// defaults, simply add in the properties `port` and `host` respectively.
		// Alternatively you can omit the port and host properties and the server
		// task will instead default to process.env.PORT or process.env.HOST.
		//
		// Changing the defaults might look something like this:
		//
		// server: {
		//   host: "127.0.0.1", port: 9001
		//   debug: { ... can set host and port here too ...
		//  }
		//
		server: {
			//files: { "favicon.ico": "favicon.ico" },
			//
			//debug: {
			//  // Ensure the favicon is mapped correctly.
			//  files: { "favicon.ico": "favicon.ico" },
			//
			//  // Map `server:debug` to `debug` folders.
			//  folders: {
			//    "app": "dist/debug",
			//    "assets/js/libs": "dist/debug",
			//    "assets/css": "dist/debug"
			//  }
			//},
			//
			//release: {
			//  // This makes it easier for deploying, by defaulting to any IP.
			//  host: "0.0.0.0",
			//
			//  // Ensure the favicon is mapped correctly.
			//  files: { "favicon.ico": "favicon.ico" },
			//
			//  // Map `server:release` to `release` folders.
			//  folders: {
			//    "app": "dist/release",
			//    "assets/js/libs": "dist/release",
			//    "assets/css": "dist/release"
			//  }
			//}
		},
		
		// Watch task checks for files changes, then execute the defined task
		watch: {
			compass: {
				files: ['www/assets/sass/**/*'],
				tasks: ['compass:dev']
			},
			scripts: {
				files: ['www/app/**/*'],
				tasks: ['scripts']
			}
		}
		
	});
	
	grunt.loadNpmTasks('grunt-contrib');
	grunt.loadNpmTasks('grunt-img');
	grunt.loadNpmTasks('grunt-compass');
	
	
	grunt.registerTask("scripts", "clean:all lint handlebars requirejs concat clean:build");
	grunt.registerTask("debug", "scripts compass:dev");
	grunt.registerTask("release", "scripts compass:prod min img");
	
};
