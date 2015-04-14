'use strict';
var yeoman = require('yeoman-generator'),
    chalk = require('chalk'),
    yosay = require('yosay'),
    path = require('path'),
    inflections = require('underscore.inflections'),
    _ = require('lodash'),
    _s = require('underscore.string');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the magnificent ' + chalk.red('Yams') + ' generator!'
    ));

    var prompts = [{
      name: 'appFullName',
      message: 'What do you want to call your amazing new application?',
      default: 'Application of Wonders'
    }, {
        name: 'appDescription',
        message: 'Please provide a description of your application.',
        default: 'This app will do incredible things, including - but not limited to saving the world from mosquitos!'
    }, {
        type: 'list',
        name: 'appSiteSpecific',
        message: 'Will your application manage site-specific data or global?',
        choices: [{
            name: 'Site specific fo sho!',
            value: 'siteSpecificApp'
        }, {
            name: 'We goin\' global...',
            value: 'globalApp'
        }]
    }, {
        type: 'list',
        name: 'appScope',
        message: 'Is this application going to be client-side, server-side, or both?',
        choices: [{
            name: 'Client-side only',
            value: 'clientOnlyApp'
        }, {
            name: 'Server-side only',
            value: 'serverOnlyApp'
        }, {
            name: 'I want the whole kit and kaboodle!',
            value: 'clientAndServerApp'
        }]
    }, {
        when: function(props) {
            return props.appScope.indexOf('serverOnlyApp') === -1
        },
        type: 'confirm',
        name: 'addMenuItem',
        message: 'Would you like to add an item to the main navigation?'
    }];

    this.prompt(prompts, function (props) {
      this.appFullName = props.appFullName;
      this.appname = _s.slugify(props.appFullName);
      this.slugifiedName = this.appname;
      this.slugifiedPluralName = inflections.pluralize(this.slugifiedName);
      this.slugifiedSingularName = inflections.singularize(this.slugifiedName);
      this.camelizedPluralName = _s.camelize(this.slugifiedPluralName);
      this.camelizedSingularName = _s.camelize(this.slugifiedSingularName);
      this.classifiedPluralName = _s.classify(this.slugifiedPluralName);
      this.classifiedSingularName = _s.classify(this.slugifiedSingularName);
      this.humanizedPluralName = _s.humanize(this.slugifiedPluralName);
      this.humanizedSingularName = _s.humanize(this.slugifiedSingularName);
      this.appDescription = props.appDescription;

      // Site specific vs. global
      this.siteSpecificApp = props.siteSpecificApp;
      this.globalApp = props.globalApp;

      // Server vs Client side
      this.clientOnlyApp = props.clientOnlyApp;
      this.serverOnlyApp = props.serverOnlyApp;
      this.clientAndServerApp = props.clientAndServerApp;

      done();
    }.bind(this));
  },

  configuring:{
    enforceFolderName: function () {
      if (this.appname !== _.last(this.destinationRoot().split(path.sep))) {
        this.destinationRoot(this.appname);
      }
      this.config.save();
    }
  },

  writing: {
    app: function () {
      this.template('_package.json', 'package.json');
      this.template('_bower.json', 'bower.json');
      this.template('config/_default.js', 'config/default.json');
    },

    configFiles: function () {
      this.fs.copy(
          this.templatePath('bowerrc'),
          this.destinationPath('.bowerrc')
      );
      this.fs.copy(
          this.templatePath('csslintrc'),
          this.destinationPath('.csslintrc')
      );
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
          this.templatePath('gitignore'),
          this.destinationPath('.gitignore')
      );
      this.fs.copy(
          this.templatePath('jscsrc'),
          this.destinationPath('.jscsrc')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
      // /app specific jshintrc to allow for different rules
      this.fs.copy(
          this.templatePath('app/jshintrc'),
          this.destinationPath('app/.jshintrc')
      );
      // /public specific jshintrc to allow for different rules
      this.fs.copy(
          this.templatePath('public/jshintrc'),
          this.destinationPath('public/.jshintrc')
      );
      this.fs.copy(
          this.templatePath('travis.yml'),
          this.destinationPath('.travis.yml')
      );
      this.fs.copy(
          this.templatePath('Gruntfile'),
          this.destinationPath('Gruntfile.js')
      );
    }
  },

  install: function () {
    this.installDependencies();
  }
});
