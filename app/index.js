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
    }, {
        when: function(props) {
            return props.appScope.indexOf('serverOnlyApp') === -1
        },
        type: 'checkbox',
        name: 'addClientSideExtras',
        message: 'Please select the client side features you would like included.',
        choices: [{
            name: 'CSS',
            value: 'includeCSS',
            checked: true
        }, {
            name: 'Directives (Angular)',
            value: 'includeDirectives',
            checked: false
        }, {
            name: 'Filters (Angular)',
            value: 'includeFilters',
            checked: false
        }, {
            name: 'Images',
            value: 'includeImages',
            checked: false
        }, {
            name: 'Views (HTML)',
            value: 'includeViews',
            checked: true
        }]
    }];

    this.prompt(prompts, function (props) {
      this.appFullName = props.appFullName;
      this.appname = _s.slugify(props.appFullName);
      this.slugifiedPluralName = inflections.pluralize(this.appname);
      this.slugifiedSingularName = inflections.singularize(this.appname);
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

      // Setup the basic app path
      this.baseStatePath = props.siteSpecificApp ? 'site.' + this.appname : this.appname;

      // Server vs Client side
      this.clientOnlyApp = props.clientOnlyApp;
      this.serverOnlyApp = props.serverOnlyApp;
      this.clientAndServerApp = props.clientAndServerApp;

      var features = props.addClientSideExtras;

      function hasFeature (feat) {
          return features.indexOf(feat) !== -1;
      }
      // Client side options
      this.addMenuItem = props.addMenuItem;
      this.includeCss = hasFeature('includeCSS');
      this.includeDirectives = hasFeature('includeDirectives');
      this.includeFilters = hasFeature('includeFilters');
      this.includeImages = hasFeature('includeImages');
      this.includeViews = hasFeature('includeViews');

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
        var includeClient = true,
            includeServer = true,
            publicPath = "/public/modules/" + this.slugifiedName;

        if (this.clientOnlyApp) {
            includeServer = false;
        } else if (this.serverOnlyApp) {
            includeClient = false;
        }

        if (includeClient) {
            // config
            this.fs.copy(
                this.templatePath('public/modules/_/config/_.client.routes.js'),
                this.destinationPath(publicPath, 'config/' + this.slugifiedName + '.client.routes.js')
            );
            this.fs.copy(
                this.templatePath('public/modules/_/tests/routes/_.client.routes.test.js'),
                this.destinationPath(publicPath, 'tests/routes/' + this.slugifiedName + '.client.routes.test.js')
            );
            if (this.addMenuItem) {
                this.fs.copy(
                    this.templatePath('public/modules/_/config/_.client.config.js'),
                    this.destinationPath(publicPath, 'config/' + this.slugifiedName + '.client.config.js')
                );
            }
            // controllers
            this.fs.copy(
                this.templatePath('public/modules/_/controllers/_.client.controller.js'),
                this.destinationPath(publicPath, 'controllers/' + this.slugifiedName + '.client.controller.js')
            );
            this.fs.copy(
                this.templatePath('public/modules/_/tests/controllers/_.client.controller.test.js'),
                this.destinationPath(publicPath, 'tests/controllers/' + this.slugifiedName + '.client.controller.test.js')
            );
            // css
            if (this.includeCss) {
                this.fs.copy(
                    this.templatePath('public/modules/_/css/_.css'),
                    this.destinationPath(publicPath, 'css/' + this.slugifiedName + '.css')
                );
            }
            // directives
            if (this.includeDirectives) {
                console.log('adding directives!');
                this.fs.copy(
                    this.templatePath('public/modules/_/directives/_.client.directive.js'),
                    this.destinationPath(publicPath, 'directives/' + this.slugifiedName + '.client.directive.js')
                );
                this.fs.copy(
                    this.templatePath('public/modules/_/tests/directives/_.client.directive.test.js'),
                    this.destinationPath(publicPath, 'tests/directives/' + this.slugifiedName + '.client.directive.test.js')
                );
            }
            // filters
            if (this.includeFilters) {
                this.fs.copy(
                    this.templatePath('public/modules/_/filters/_.client.filter.js'),
                    this.destinationPath(publicPath, 'filters/' + this.slugifiedName + '.client.filter.js')
                );
                this.fs.copy(
                    this.templatePath('public/modules/_/tests/filters/_.client.filter.test.js'),
                    this.destinationPath(publicPath, 'tests/filters/' + this.slugifiedName + '.client.filter.test.js')
                );
            }
            // images
            if (this.includeImages) {
                this.fs.copy(
                    this.templatePath('public/modules/_/img/blank.gif'),
                    this.destinationPath(publicPath, 'img/blank.gif')
                );
            }
            // services
            this.fs.copy(
                this.templatePath('public/modules/_/services/_.client.service.js'),
                this.destinationPath(publicPath, 'services/' + this.slugifiedName + '.client.service.js')
            );
            this.fs.copy(
                this.templatePath('public/modules/_/tests/services/_.client.service.test.js'),
                this.destinationPath(publicPath, 'tests/services/' + this.slugifiedName + '.client.service.test.js')
            );
            // views
            if (this.includeViews) {
                this.fs.copy(
                    this.templatePath('public/modules/_/views/_.client.view.html'),
                    this.destinationPath(publicPath, 'views/' + this.slugifiedName + '.client.view.html')
                );
            }
        }

        if (includeServer) {
            // controllers
            this.fs.copy(
                this.templatePath('app/controllers/_.server.controller.js'),
                this.destinationPath('app/controllers/' + this.slugifiedName + '.server.controller.js')
            );
            this.fs.copy(
                this.templatePath('app//tests/controllers/_.server.controller.test.js'),
                this.destinationPath('app/tests/controllers/' + this.slugifiedName + '.server.controller.test.js')
            );
            // routes
            this.fs.copy(
                this.templatePath('app/routes/_.server.routes.js'),
                this.destinationPath('app/routes/' + this.slugifiedName + '.server.routes.js')
            );
            // services
            this.fs.copy(
                this.templatePath('app/services/_.server.service.js'),
                this.destinationPath('app/services/' + this.slugifiedName + '.server.service.js')
            );
            this.fs.copy(
                this.templatePath('app//tests/services/_.server.service.test.js'),
                this.destinationPath('app/tests/services/' + this.slugifiedName + '.server.service.test.js')
            );
        }

    },

    configFiles: function () {
      this.template('_package.json', 'package.json');
      this.template('_bower.json', 'bower.json');
      this.template('config/_default.js', 'config/default.json');
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
