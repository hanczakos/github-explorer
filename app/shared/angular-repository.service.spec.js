describe('AngularRepositoryService', function() {

    var createService,
        $httpBackend,
        getCommitActivityResponse = JSON.stringify([
            {"days":[1,2,3,4,5,6,7],"total":28,"week":1431216000},
            {"days":[3,4,5,6,7,8,9],"total":42,"week":1431820800},
            {"days":[5,6,7,8,9,10,11],"total":84,"week":1432425600}
        ]);

    beforeEach(module('blackswan-homework'));

    beforeEach(inject(function(_$httpBackend_, AngularRepositoryService) {
        $httpBackend = _$httpBackend_;
        createService = function() {
            return AngularRepositoryService;
        }
    }));

    describe('getWeeklyCommitActivity', function() {
        it('should return the weekly commit activity', function() {

            $httpBackend.expectGET('https://api.github.com/repos/angular/angular/stats/commit_activity').respond(
                getCommitActivityResponse
            );
            var $service = createService();

            $service.getWeeklyCommitActivity().then(function(response) {
                expect(response.data).toEqual([28,42,84]);
            });
            $httpBackend.flush();

        });
    });

    describe('getDailyCommitActivity', function() {
        it('should return the daily commit activity', function() {

            $httpBackend.expectGET('https://api.github.com/repos/angular/angular/stats/commit_activity').respond(
                getCommitActivityResponse
            );
            var $service = createService();

            $service.getDailyCommitActivity().then(function(response) {
                expect(response.data).toEqual([3,4,5,6,7,8,9]);
            });
            $httpBackend.flush();
        });
    });

});