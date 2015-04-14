'use strict';
var yeoman = require('yeoman-generator'),
    chalk = require('chalk'),
    yosay = require('yosay'),
    path = require('path'),
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
      name: 'appName',
      message: 'What do you want to call your amazing new application?',
      default: "Application of Wonders"
    }, {
        name: 'appDescription',
        message: 'Please provide a description of your application.',
        default: "This app will do incredible things, including - but not limited to saving the world from mosquitos!"
    }];

    this.prompt(prompts, function (props) {
      this.appname = _s.slugify(props.appName);
      this.humanReadableName = _s.humanize(props.appName);
      this.appDescription = props.appDescription;

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
    },

    configfiles: function () {
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
      this.fs.copy(
          this.templatePath('travis.yml'),
          this.destinationPath('.travis.yml')
      );
    },

    gruntfiles: function () {
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
