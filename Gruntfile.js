'use strict';

module.exports = function (grunt) {
    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        yeoman: {
            // configurable paths
            app: 'app',
            scripts: 'scripts',
            styles: 'styles',
            images: 'images'
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            js: {
                files: ['<%= yeoman.app %>/<%= yeoman.scripts %>/**/*.js'],
                options: {
                    livereload: true
                }
            },
            styles: {
                files: ['<%= yeoman.app %>/<%= yeoman.styles %>/**/*.css'],
                tasks: ['copy:styles', 'autoprefixer']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= yeoman.app %>/*.html',
                    '<%= yeoman.app %>/templates/**/*.html',
                    '.tmp/<%= yeoman.styles %>/**/*.css',
                    '<%= yeoman.app %>/<%= yeoman.images %>/**/*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '.tmp',
                        '<%= yeoman.app %>'
                    ]
                }
            },
            coverage: {
                options: {
                    port: 9002,
                    open: true,
                    base: ['coverage']
                }
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            styles: {
                expand: true,
                cwd: '<%= yeoman.app %>/<%= yeoman.styles %>',
                dest: '.tmp/<%= yeoman.styles %>/',
                src: '{,*/}*.css'
            },
            fonts: {
                expand: true,
                cwd: 'app/bower_components/ionic/release/fonts/',
                dest: '<%= yeoman.app %>/fonts/',
                src: '*'
            },
            vendor: {
                expand: true,
                cwd: '<%= yeoman.app %>/vendor',
                dest: '.tmp/<%= yeoman.styles %>/',
                src: '{,*/}*.css'
            },
            all: {
                expand: true,
                cwd: '<%= yeoman.app %>/',
                src: '**',
                dest: 'www/'
            }
        },

        concurrent: {
            server: [
                'copy:styles',
                'copy:vendor',
                'copy:fonts'
            ],
            test: [
                'copy:styles',
                'copy:vendor',
                'copy:fonts'
            ]
        }
    });

    grunt.registerTask('serve', function () {
        grunt.task.run([
            'concurrent:server',
            'connect:livereload',
            'watch'
        ]);
    });
};