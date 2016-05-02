angular
    .module('blackswan-homework', [ 'ngRoute' ])
    .config(function($routeProvider) {
        $routeProvider
            .when('/explorer', {
                templateUrl: 'explorer/explorer.html',
                controller: 'ExplorerController',
                controllerAs: 'vm'
            })
            .when('/issues/:owner/:repository', {
                templateUrl: 'issues/issues.html',
                controller: 'IssuesController',
                controllerAs: 'vm'
            })
            .when('/analyzer', {
                templateUrl: 'analyzer/analyzer.html',
                controller: 'AnalyzerController',
                controllerAs: 'vm'
            })
            .otherwise({
                redirectTo: '/explorer'
            });
        });