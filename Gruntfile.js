module.exports = function(grunt) {

	grunt.initConfig({
		//pkg: grunt.file.readJSON('package.json'),

		// Our multiple taks: sass, concat, autoprefixer, etc.
		includes:{
			build:{
				src: ['template/index.html'],
				dest: './',
				flatten: true
			}
		}



	});


	// load Npm tasks
	grunt.loadNpmTasks('grunt-includes');


	// define our shortcut commands
	grunt.registerTask('build', ['includes:build']);



};