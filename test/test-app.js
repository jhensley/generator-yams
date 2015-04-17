'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

var basicFiles = [
    'bower.json',
    'package.json',
    'config/default.js',
    '.bowerrc',
    '.csslintrc',
    '.gitignore',
    '.editorconfig',
    '.jscsrc',
    '.jshintrc',
    'app/.jshintrc',
    'public/.jshintrc',
    '.travis.yml'
];
var clientFiles = [
    'public/modules/test/test.client.module.js',
    'public/modules/test/config/test.client.auth.js',
    'public/modules/test/config/test.client.routes.js',
    'public/modules/test/controllers/test.client.controller.js',
    'public/modules/test/services/test.client.service.js',
    'public/modules/test/tests/config/test.client.auth.test.js',
    'public/modules/test/tests/controllers/test.client.controller.test.js',
    'public/modules/test/tests/services/test.client.service.test.js',
];
var clientViews = [
    'public/modules/test/views/test.client.view.html'
];
var clientDirectives = [
    'public/modules/test/directives/test.client.directive.js',
    'public/modules/test/tests/directives/test.client.directive.test.js'
];
var clientFilters = [
    'public/modules/test/filters/test.client.filter.js',
    'public/modules/test/tests/filters/test.client.filter.test.js'
];
var clientImages = [
    'public/modules/test/img/blank.gif'
];
var clientCSS = [
    'public/modules/test/css/test.css'
];
var clientMenu = [
    'public/modules/test/config/test.client.config.js'
];
var serverFiles = [
    'app/controllers/test.server.controller.js',
    'app/routes/test.server.routes.js',
    'app/services/test.server.service.js',
    'app/tests/controllers/test.server.controller.test.js',
    'app/tests/services/test.server.service.test.js'
];

describe('YAMS Generator', function() {
    describe('Default Inputs', function() {
        before(function (done) {
           helpers.run(path.join(__dirname, '../app'))
               .withOptions({ skipInstall: true })
               .withPrompts({ appFullName: 'test' })
               .on('end', done);
        });
        it('should contain the default files', function() {
            assert.file(basicFiles);
            assert.file(clientFiles);
            assert.file(serverFiles);
        });
    });
    describe('Client Only', function() {
        before(function (done) {
            helpers.run(path.join(__dirname, '../app'))
                .withOptions({ skipInstall: true })
                .withPrompts({ appFullName: 'test', appScope: 'clientOnlyApp' })
                .on('end', done);
        });
        it('should contain the default files', function() {
            assert.file(basicFiles);
            assert.file(clientFiles);
            assert.noFile(serverFiles);
        });
    });
    describe('Server Only', function() {
        before(function (done) {
            helpers.run(path.join(__dirname, '../app'))
                .withOptions({ skipInstall: true })
                .withPrompts({ appFullName: 'test', appScope: 'serverOnlyApp' })
                .on('end', done);
        });
        it('should contain the default files', function() {
            assert.file(basicFiles);
            assert.noFile(clientFiles);
            assert.file(serverFiles);
        });
    });
    describe('Client Menu', function() {
        before(function (done) {
            helpers.run(path.join(__dirname, '../app'))
                .withOptions({ skipInstall: true })
                .withPrompts({ appFullName: 'test', appScope: 'clientOnlyApp', addMenuItem: true })
                .on('end', done);
        });
        it('should contain the menu files', function() {
            assert.file(clientMenu);
        });
    });
    describe('Client - No extras', function() {
        before(function (done) {
            helpers.run(path.join(__dirname, '../app'))
                .withOptions({ skipInstall: true })
                .withPrompts({ appFullName: 'test', appScope: 'clientOnlyApp', addClientSideExtras: [] })
                .on('end', done);
        });
        it('should contain the css files', function() {
            assert.noFile(clientCSS);
            assert.noFile(clientDirectives);
            assert.noFile(clientFilters);
            assert.noFile(clientViews);
            assert.noFile(clientImages);
        });
    });
    describe('Client CSS', function() {
        before(function (done) {
            helpers.run(path.join(__dirname, '../app'))
                .withOptions({ skipInstall: true })
                .withPrompts({ appFullName: 'test', appScope: 'clientOnlyApp', addClientSideExtras: ['includeCSS'] })
                .on('end', done);
        });
        it('should contain the css files', function() {
            assert.file(clientCSS);
        });
    });
    describe('Client Images', function() {
        before(function (done) {
            helpers.run(path.join(__dirname, '../app'))
                .withOptions({ skipInstall: true })
                .withPrompts({ appFullName: 'test', appScope: 'clientOnlyApp', addClientSideExtras: ['includeImages'] })
                .on('end', done);
        });
        it('should contain the image files', function() {
            assert.file(clientImages);
        });
    });
    describe('Client Directives', function() {
        before(function (done) {
            helpers.run(path.join(__dirname, '../app'))
                .withOptions({ skipInstall: true })
                .withPrompts({ appFullName: 'test', appScope: 'clientOnlyApp', addClientSideExtras: ['includeDirectives'] })
                .on('end', done);
        });
        it('should contain the directives files', function() {
            assert.file(clientDirectives);
        });
    });
    describe('Client Filters', function() {
        before(function (done) {
            helpers.run(path.join(__dirname, '../app'))
                .withOptions({ skipInstall: true })
                .withPrompts({ appFullName: 'test', appScope: 'clientOnlyApp', addClientSideExtras: ['includeFilters'] })
                .on('end', done);
        });
        it('should contain the filters files', function() {
            assert.file(clientFilters);
        });
    });
    describe('Client Views', function() {
        before(function (done) {
            helpers.run(path.join(__dirname, '../app'))
                .withOptions({ skipInstall: true })
                .withPrompts({ appFullName: 'test', appScope: 'clientOnlyApp', addClientSideExtras: ['includeViews'] })
                .on('end', done);
        });
        it('should contain the views files', function() {
            assert.file(clientViews);
        });
    });
});