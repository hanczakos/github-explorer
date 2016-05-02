angular.module('blackswan-homework')
    .service('AngularRepositoryService', function($http) {
        return {
            getWeeklyCommitActivity: function() {
                return $http.get('https://api.github.com/repos/angular/angular/stats/commit_activity', {
                    transformResponse: function(response) {
                        return JSON.parse(response).map(function(week) {
                            return week.total;
                        });
                    }
                });
            },
            getDailyCommitActivity: function() {
                return $http.get('https://api.github.com/repos/angular/angular/stats/commit_activity', {
                    transformResponse: function(response) {
                        var data = JSON.parse(response),
                            averageDailyCommits = Array.apply(0, new Array(7)).map(function() {
                                return 0;
                            });

                        data.forEach(function(week) {
                            week.days.forEach(function(dailyCommit, day) {
                                averageDailyCommits[day] += dailyCommit;
                            })
                        });

                        return averageDailyCommits.map(function(day) {
                            return Math.floor(day/data.length*100)/100;
                        });
                    }
                });
            }
        }
    });

