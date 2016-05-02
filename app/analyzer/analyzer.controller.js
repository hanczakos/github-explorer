angular.module('blackswan-homework')
    .controller('AnalyzerController', function() {

        var vm = this;
        vm.type = 'daily';
        vm.setType = setType;

        function setType(type) {
            vm.type = type;
        }

});