'use strict';

var expect = require('chai').expect,
    <%= camelizedSingularName %>Service = require('../../services/<%= camelizedSingularName %>.server.service');

describe('Service: <%= humanizedSingularName %>', function() {
    describe('getHelloWorld', function() {
        it('Should return passed text', function() {
            expect(<%= camelizedSingularName %>Service.getHelloWorld('this is a test').data).to.equal('this is a test');
        });
    });
});
