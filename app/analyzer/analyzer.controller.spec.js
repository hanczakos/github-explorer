describe('AnalyzerController', function() {

    var createController;

    beforeEach(module('blackswan-homework'));

    beforeEach(inject(function($controller) {
        createController = function() {
            return $controller('AnalyzerController');
        }
    }));

    describe('constructor', function() {
       it('should initialize the type', function() {
           var $controller = createController();
           expect($controller.type).toEqual('daily');
       });
    });

    describe('setType', function() {
        it('should set the type to weekly', function() {
            var $controller = createController();
            $controller.setType('weekly');
            expect($controller.type).toEqual('weekly');
        });

        it('should set the type to daily', function() {
            var $controller = createController();
            $controller.setType('daily');
            expect($controller.type).toEqual('daily');
        })
    });

});