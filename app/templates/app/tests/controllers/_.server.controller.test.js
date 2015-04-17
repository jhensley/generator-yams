'use strict';

var expect = require('chai').expect,
    mockExpress = require('mock-express'),
    app = mockExpress(),
    <%= camelizedName %>Controller = require('../../controllers/<%= camelizedName %>.server.controller');

describe('Controllers: <%= humanizedName %>', function() {
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
                <%= camelizedName %>Controller.helloWorld(req, res, done);
            });
        });
    });
});
