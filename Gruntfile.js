/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('bower.json'),
    // Task configuration.
    concat: {
      options: {
        stripBanners: false
      },
      dist: {
        src: ['lib/<%= pkg.name %>.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    cssmin: {
      dist: {
        files: {
          'dist/<%= pkg.name %>.css': ['lib/**/*.css']
        }
      }
    },
    uglify: {
      dist: {
        src: [
          'bower_components/hammerjs/dist/jquery.hammer.js',
          '<%= concat.dist.dest %>',
        ],
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    copy: {
      demo: {
        expand: true,
        cwd: 'dist/',
        src: ['onepage-scroll.css', 'onepage-scroll.js'],
        dest: 'Demo/'
      },
      hammer: {
        files: {
          'Demo/jquery.hammer.js' : 'bower_components/hammerjs/dist/jquery.hammer.js'
        }
      }
    },
    jshint: {
      options: {
        asi: true,
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['lib/**/*.js', 'test/**/*.js']
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task.
  grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'cssmin', 'copy']);

};
