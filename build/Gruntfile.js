module.exports = function (grunt)
{
	grunt.initConfig({
	    phpdocumentor: {
	        dist: {
	            options: {
	                directory : '../doublefou/components,../doublefou/core,../doublefou/helper,../doublefou/tools',
	                target : '../docs'
	            }
	        }
	    }
	})

	// Load grunt plugins
	grunt.loadNpmTasks('grunt-phpdocumentor');
};