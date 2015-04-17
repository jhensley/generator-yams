'use strict';

var <%= camelizedName %>Service = require('../services/<%= camelizedName %>.server.service');

module.exports.helloWorld = function(req, res, next) {
    var data = <%= camelizedName %>Service.getHelloWorld('This message is from an external source. Oh, and Hello World!');
    res.status(200).send(data);
};
