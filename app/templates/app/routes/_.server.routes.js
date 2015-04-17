'use strict';

var auth = require('presto-framework').auth,
    <%= camelizedSingularName %>Controller = require('../controllers/<%= camelizedSingularName %>.server.controller');

module.exports = function(router) {
    router.all(auth.restrictAccess('<%= camelizedSingularName %>'));
    router.get('/hello-world', <%= camelizedSingularName %>Controller.helloWorld);
};
