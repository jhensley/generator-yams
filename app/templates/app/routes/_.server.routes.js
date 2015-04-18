'use strict';

var auth = require('yams-auth').auth,
    <%= camelizedName %>Controller = require('../controllers/<%= camelizedName %>.server.controller');

module.exports = function(router) {
    router.all(auth.restrictAccess('<%= camelizedName %>'));
    router.get('/hello-world', <%= camelizedName %>Controller.helloWorld);
};
