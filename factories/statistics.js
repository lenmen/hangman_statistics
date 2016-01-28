statisticsApp.factory("statistics", ['$http',
    function($http) {
        var statistics = {};

        statistics.getAll = function () {
            return $http.get('http://backend.hangman.nl/overview');
        };

        statistics.getDetail = function (uuid) {
            $http.get('http://backend.hangman.nl/games/' + uuid + '/detail').success(function(data) {
               return data;
            }).error(function(msg) {
                return 1;
            });
        };

        return statistics;
    }]);