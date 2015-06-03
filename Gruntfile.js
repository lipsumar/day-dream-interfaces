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
		},


		cacheBust: {
			assets: {
				files: {
					src: ['index.html']
				}
			},
			options:{
				rename:false
			}
		}



	});


	// load Npm tasks
	grunt.loadNpmTasks('grunt-includes');
	grunt.loadNpmTasks('grunt-cache-bust');


	// define our shortcut commands
	grunt.registerTask('build', ['includes:build', 'cacheBust']);



};