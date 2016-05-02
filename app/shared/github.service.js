angular.module('blackswan-homework')
    .service('GithubService', function($http) {
        return {
            getRepositories: function(queryString) {
                return $http.get('https://api.github.com/search/repositories', {
                    params: { q: queryString }
                });
            },
            getIssues: function(owner, repository) {
                return $http.get('https://api.github.com/repos/' + owner + '/' + repository + '/issues');
            }
        }
    });