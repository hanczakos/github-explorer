angular.module('blackswan-homework')
    .controller('IssuesController', function($routeParams, GithubService) {

        var vm = this;
        vm.repositoryOwner = $routeParams.owner;
        vm.repositoryName = $routeParams.repository;
        vm.issues = [];
        vm.loading = true;

        init();

        function init() {
            vm.loading = true;
            GithubService.getIssues($routeParams.owner, $routeParams.repository).then(function(response) {
                vm.issues = response.data;
                vm.loading = false;
            });
        }

    });