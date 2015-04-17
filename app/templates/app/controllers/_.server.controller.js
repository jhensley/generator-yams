'use strict';

var <%= camelizedSingularName %>Service = require('../services/<%= camelizedSingularName %>.server.service');

module.exports.helloWorld = function(req, res, next) {
    var data = <%= camelizedSingularName %>Service.getHelloWorld('This message is from an external source. Oh, and Hello World!');
    res.status(200).send(data);
};
