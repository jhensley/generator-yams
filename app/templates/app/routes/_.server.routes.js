'use strict';

var auth = require('presto-framework').auth,
    <%= camelizedPluralName %>Controller = require('../controllers/<%= appname %>.server.controller');

module.exports = function(router) {
    router.all(auth.restrictAccess('<%= appname %>'));
    router.get('/<%= appname %>/hello-world', <%= camelizedPluralName %>Controller.helloWorld);
};