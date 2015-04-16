'use strict';

var expect = require('chai').expect,
    <%= camelizedPluralName %>Service = require('../../services/<%= appname %>.server.service');

describe('Service: <%= humanizedPluralName %>', function() {
    describe('getHelloWorld', function() {
        it('Should return passed text', function() {
            expect(<%= camelizedPluralName %>Service.getHelloWorld('this is a test')).to.equal('this is a test');
        });
    });
});