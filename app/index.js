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
      'Welcome to the magnificent ' + chalk.red('YAMS') + ' generator!'
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
            if (props.appScope) {
                return props.appScope.indexOf('serverOnlyApp') === -1;
            }
        },
        type: 'confirm',
        name: 'addMenuItem',
        message: 'Would you like to add an item to the main navigation?'
    }, {
        when: function(props) {
            if (props.appScope) {
                return props.appScope.indexOf('serverOnlyApp') === -1;
            }
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
      this.slugifiedName = this.appname;
      this.classifiedName = _s.classify(this.slugifiedName);
      this.camelizedName = _s.camelize(this.slugifiedName);
      this.humanizedName = _s.humanize(this.slugifiedName);
      this.appDescription = props.appDescription;

      // Setup the basic app path
      this.isSiteAware = function() {
          if (props.appSiteSpecific) {
              return props.appSiteSpecific.indexOf('siteSpecificApp') !== -1;
          }
      };
      this.baseStatePath = this.isSiteAware() === true ? 'site.' + this.camelizedName : this.camelizedName;

      // Server vs Client side
      this.clientOnlyApp = function() {
          if (props.appScope) {
              return props.appScope.indexOf('clientOnlyApp') !== -1;
          }
      };
      this.serverOnlyApp = function() {
          if (props.appScope) {
              return props.appScope.indexOf('serverOnlyApp') !== -1;
          }
      };
      this.clientAndServerApp = function() {
          if (props.appScope) {
              return props.appScope.indexOf('clientAndServerApp') !== -1;
          }
      };

      var features = props.addClientSideExtras || {};

      function hasFeature (feat) {
          return features.indexOf(feat) !== -1;
      }

      if (!this.serverOnlyApp()) {
          // Client side options
          this.addMenuItem = props.addMenuItem;
          this.includeCss = hasFeature('includeCSS');
          this.includeDirectives = hasFeature('includeDirectives');
          this.includeFilters = hasFeature('includeFilters');
          this.includeImages = hasFeature('includeImages');
          this.includeViews = hasFeature('includeViews');
      }

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
            publicPath = "/public/modules/" + this.appname;

        if (this.clientOnlyApp()) {
            includeServer = false;
        } else if (this.serverOnlyApp()) {
            includeClient = false;
        }

        if (includeClient) {
            // module registration
            this.template(
                this.templatePath('public/modules/_/_.client.module.js'),
                this.destinationPath(publicPath, this.camelizedName + '.client.module.js')
            );
            // auth
            this.template(
                this.templatePath('public/modules/_/config/_.client.auth.js'),
                this.destinationPath(publicPath, 'config/' + this.camelizedName + '.client.auth.js')
            );
            this.template(
                this.templatePath('public/modules/_/tests/config/_.client.auth.test.js'),
                this.destinationPath(publicPath, 'tests/config/' + this.camelizedName + '.client.auth.test.js')
            );
            // config
            this.template(
                this.templatePath('public/modules/_/config/_.client.routes.js'),
                this.destinationPath(publicPath, 'config/' + this.camelizedName + '.client.routes.js')
            );
            if (this.addMenuItem) {
                this.template(
                    this.templatePath('public/modules/_/config/_.client.config.js'),
                    this.destinationPath(publicPath, 'config/' + this.camelizedName + '.client.config.js')
                );
            }
            // controllers
            this.template(
                this.templatePath('public/modules/_/controllers/_.client.controller.js'),
                this.destinationPath(publicPath, 'controllers/' + this.camelizedName + '.client.controller.js')
            );
            this.template(
                this.templatePath('public/modules/_/tests/controllers/_.client.controller.test.js'),
                this.destinationPath(publicPath, 'tests/controllers/' + this.camelizedName + '.client.controller.test.js')
            );
            // css
            if (this.includeCss) {
                this.template(
                    this.templatePath('public/modules/_/css/_.css'),
                    this.destinationPath(publicPath, 'css/' + this.camelizedName + '.css')
                );
            }
            // directives
            if (this.includeDirectives) {
                console.log('adding directives!');
                this.template(
                    this.templatePath('public/modules/_/directives/_.client.directive.js'),
                    this.destinationPath(publicPath, 'directives/' + this.camelizedName + '.client.directive.js')
                );
                this.template(
                    this.templatePath('public/modules/_/tests/directives/_.client.directive.test.js'),
                    this.destinationPath(publicPath, 'tests/directives/' + this.camelizedName + '.client.directive.test.js')
                );
            }
            // filters
            if (this.includeFilters) {
                this.template(
                    this.templatePath('public/modules/_/filters/_.client.filter.js'),
                    this.destinationPath(publicPath, 'filters/' + this.camelizedName + '.client.filter.js')
                );
                this.template(
                    this.templatePath('public/modules/_/tests/filters/_.client.filter.test.js'),
                    this.destinationPath(publicPath, 'tests/filters/' + this.camelizedName + '.client.filter.test.js')
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
            this.template(
                this.templatePath('public/modules/_/services/_.client.service.js'),
                this.destinationPath(publicPath, 'services/' + this.camelizedName + '.client.service.js')
            );
            this.template(
                this.templatePath('public/modules/_/tests/services/_.client.service.test.js'),
                this.destinationPath(publicPath, 'tests/services/' + this.camelizedName + '.client.service.test.js')
            );
            // views
            if (this.includeViews) {
                this.template(
                    this.templatePath('public/modules/_/views/_.client.view.html'),
                    this.destinationPath(publicPath, 'views/' + this.camelizedName + '.client.view.html')
                );
            }
        }

        if (includeServer) {
            console.log('generating server code')
            // controllers
            this.template(
                this.templatePath('app/controllers/_.server.controller.js'),
                this.destinationPath('app/controllers/' + this.camelizedName + '.server.controller.js')
            );
            this.template(
                this.templatePath('app//tests/controllers/_.server.controller.test.js'),
                this.destinationPath('app/tests/controllers/' + this.camelizedName + '.server.controller.test.js')
            );
            // routes
            this.template(
                this.templatePath('app/routes/_.server.routes.js'),
                this.destinationPath('app/routes/' + this.camelizedName + '.server.routes.js')
            );
            // services
            this.template(
                this.templatePath('app/services/_.server.service.js'),
                this.destinationPath('app/services/' + this.camelizedName + '.server.service.js')
            );
            this.template(
                this.templatePath('app//tests/services/_.server.service.test.js'),
                this.destinationPath('app/tests/services/' + this.camelizedName + '.server.service.test.js')
            );
        }

    },

    configFiles: function () {
      this.template(
          this.templatePath('_package.json'),
          this.destinationPath('package.json')
      );
      this.template(
          this.templatePath('_bower.json'),
          this.destinationPath('bower.json')
      );
      this.template(
          this.templatePath('config/_default.js'),
          this.destinationPath('config/default.js')
      );
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
