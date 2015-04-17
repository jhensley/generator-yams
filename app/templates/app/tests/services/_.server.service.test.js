'use strict';

var expect = require('chai').expect,
    <%= camelizedName %>Service = require('../../services/<%= camelizedName %>.server.service');

describe('Service: <%= humanizedName %>', function() {
    describe('getHelloWorld', function() {
        it('Should return passed text', function() {
            expect(<%= camelizedName %>Service.getHelloWorld('this is a test').data).to.equal('this is a test');
        });
    });
});
