angular.module('blackswan-homework')
    .directive('commitsGraph', function(AngularRepositoryService) {
        return {
            restrict: 'E',
            template: '<canvas width="400" height="200"></canvas>',
            replace: true,
            scope: {
                type: '@'
            },
            link: function($scope, element) {

                var chart;

                $scope.$watch('type', function(type) {
                    init(type);
                });

                function init(type) {
                    if (type=='weekly') {
                        AngularRepositoryService.getWeeklyCommitActivity().then(buildWeeklyGraph);
                    } else if (type=='daily') {
                        AngularRepositoryService.getDailyCommitActivity().then(buildDailyGraph);
                    }
                }

                function buildWeeklyGraph(response) {
                    var data = response.data,
                        labels = Array.apply(0, new Array(data.length)).map(function(value,key) {
                            return key+1;
                        }),
                        colors = Array.apply(0, new Array(data.length)).map(function(value,key) {
                            return key%2==0?"#666":"#888";
                        });

                    drawGraph(labels, colors, data);
                }

                function buildDailyGraph(response) {
                    var data = response.data,
                        labels = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                        colors = "#286090";

                    drawGraph(labels, colors, data);
                }

                function drawGraph(labels, colors, data) {

                    if (angular.isDefined(chart)) {
                        chart.destroy();
                    }

                    chart = new Chart(element, {
                        type: 'bar',
                        data: {
                            labels: labels,
                            datasets: [{
                                label: 'Number of commits',
                                data: data,
                                backgroundColor: colors
                            }]
                        },
                        options: {
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero:true
                                    }
                                }]
                            }
                        }
                    });
                }

            }
        };
    });