'use strict';

var expect = require('chai').expect,
    mockExpress = require('mock-express'),
    app = mockExpress(),
    <%= camelizedSingularName %>Controller = require('../../controllers/<%= camelizedSingularName %>.server.controller');

describe('Controllers: <%= humanizedSingularName %>', function() {
    var req,
        res;
    beforeEach(function() {
        req = app.makeRequest();
        res = app.makeResponse();
    });
    describe('helloWorld', function() {
        describe('Success', function() {
            it('Should return hello world text', function(done) {
                res.status = function(code) {
                    expect(code).to.equal(200);
                    return res;
                };
                res.send = function(obj) {
                    expect(obj.data).to.equal('This message is from an external source. Oh, and Hello World!');
                    done();
                };
                <%= camelizedSingularName %>Controller.helloWorld(req, res, done);
            });
        });
    });
});
