(function() {
    'use strict';

    describe('Auth: <%= humanizedPluralName %>', function() {
        //Initialize global variables
        var $scope, $state;

        // Load the main application module
        beforeEach(module(ApplicationConfiguration.applicationModuleName));

        beforeEach(inject(function(_$rootScope_, _$state_) {
            window.user = 'test';
            $scope = _$rootScope_;
            $state = _$state_;
            spyOn($state, 'go');
        }));
        afterEach(function() {
            delete window.userPermissions;
            delete window.user;
        });

        it('Should ignore unknown states', function() {
            var event = $scope.$broadcast('$stateChangeStart', {
                name: 'unknownState'
            }, {});
            expect(event.defaultPrevented).toEqual(false);
            expect($state.go).not.toHaveBeenCalled();
        });
        it('Transitioning to a state you have no access to should prevent you from going there', function() {
            var event = $scope.$broadcast('$stateChangeStart', {
                name: '<%= baseStatePath %>'
            }, {
                siteCode: 'USAT'
            });
            expect(event.defaultPrevented).toEqual(true);
            expect($state.go).toHaveBeenCalled();
            expect($state.go).toHaveBeenCalledWith('home');
        });
        it('Transitioning to a state you have no access to that site to should prevent you from going there', function() {
            window.userPermissions = {'PPAS': true};
            var event = $scope.$broadcast('$stateChangeStart', {
                name: '<%= baseStatePath %>'
            }, {
                siteCode: 'USAT'
            });
            expect(event.defaultPrevented).toEqual(true);
            expect($state.go).toHaveBeenCalled();
            expect($state.go).toHaveBeenCalledWith('home');
        });
        it('Transitioning to a state when you have all permissions should work', function() {
            window.userPermissions = {'{all}': true};
            var event = $scope.$broadcast('$stateChangeStart', {
                name: '<%= baseStatePath %>'
            }, {
                siteCode: 'USAT'
            });
            expect(event.defaultPrevented).toEqual(false);
            expect($state.go).not.toHaveBeenCalled();
        });
        it('Transitioning to a state when you have access to that site should work', function() {
            window.userPermissions = {'USAT': {'<%= appname %>': true}};
            var event = $scope.$broadcast('$stateChangeStart', {
                name: '<%= baseStatePath %>'
            }, {
                siteCode: 'USAT'
            });
            expect(event.defaultPrevented).toEqual(false);
            expect($state.go).not.toHaveBeenCalled();
        });
    });
})();