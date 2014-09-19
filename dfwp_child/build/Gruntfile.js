/**
 * Configure loaded JS file
 */
var inputJavascriptFiles = [
	// Load strong dependences for frameworks
	'../lib/dependencies/*.js'

	// Load all external libs files used by project's files
	'../lib/external/**/*.js',

	// Load the JS bootstrap file and all the project's files
	'../src/bootstrap/index.js',
	'../src/**/*.js'
];

var outputJavascriptFile = '../deploy/js/script.js';

module.exports = function (grunt)
{
	function getUglifyFilesParameters ()
	{
		var out = {};

		out[outputJavascriptFile] = [outputJavascriptFile];

		return out;
	}

	// Loaded to show each task duration
	require('time-grunt')(grunt);

	// Project and plugins configuration
	grunt.initConfig({
		concat: {
			options: {
				separator: ';\n'
			},
			dev: {
				src: inputJavascriptFiles,
				dest: outputJavascriptFile
			},
			dist: {
				src: inputJavascriptFiles,
				dest: outputJavascriptFile
			}
		},
		uglify: {
			options: {
				mangle: false
			},
			dist: {
				files: getUglifyFilesParameters()
			}
		},
		less: {
			dev: {
				options: {
					cleancss: false,
					compress: false,
					paths: [
						'../lib/**/*.less',
						'../src/**/*.less'
					]
				},
				files: {
					'../deploy/css/style.css' : '../src/bootstrap/index.less',
					'../deploy/css/pattern.css' : '../lib/lhs/pattern/pattern.less',
				}
			},
			dist: {
				options: {
					cleancss: true,
					compress: true,
					paths: [
						'../lib/**/*.less',
						'../src/**/*.less'
					]
				},
				files: {
					'../deploy/css/style.css' : '../src/bootstrap/index.less'
				}
			}
		},
		autoprefixer: {
			options: {
				browsers: ['last 2 versions']
			},
			dist: {
				expand: true,
				flatten: true,
				src: '../deploy/*.css',
				dest: '../deploy/'
			}
		},
		watch: {
			style: {
				files: [
					'../lib/**/*.less',
					'../src/**/*.less'
				],
				tasks: ['style']
			},
			script: {
				files: [
					'../lib/**/*.js',
					'../src/**/*.js'
				],
				tasks: ['script']
			}
		}
	});

	// Load grunt plugins
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	
	// Declare dev subtasks
	grunt.registerTask('style', ['less:dev', 'autoprefixer:dist']);
	grunt.registerTask('script', ['concat:dev']);

	// Declare output tasks
	grunt.registerTask('dev', ['style', 'script']);
	grunt.registerTask('dist', ['less:dist', 'autoprefixer:dist', 'concat:dist', 'uglify:dist']);

	// Run "dev" and watch on default
	grunt.registerTask('default', ['dev', 'watch']);
};