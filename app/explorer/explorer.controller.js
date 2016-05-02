angular.module('blackswan-homework')
    .controller('ExplorerController', function(GithubService) {

        var vm = this;
        vm.searchInput = "";
        vm.foundRepositories = [];
        vm.totalResultsCount = 0;
        vm.searchRepositories = searchRepositories;

        function searchRepositories() {
            vm.totalResultsCount = 0;
            GithubService.getRepositories(vm.searchInput).then(function(response) {
                vm.foundRepositories = response.data.items;
                vm.totalResultsCount = response.data.total_count;
            });
        }

});