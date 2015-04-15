'use strict';

var <%= camelizedPluralName %>Service = require('../services/<%= appname %>.server.service');

module.exports.helloWorld = function(req, res, next) {
    var text = <%= camelizedPluralName %>Service.helloWorld('This message is from an external source. Oh, and Hello World!');
    res.status(200).send(text);
};