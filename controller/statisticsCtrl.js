statisticsApp.controller("statisticsCtrl", ["statistics", "$scope",
    function(statistics, $scope) {
        $scope.tab = 0;
        $scope.counts = 0;
        $scope.currentPage = 1;
        $scope.pageSize = 10;
        $scope.order = "gameStartedAt";
        $scope.statisticsOfGame = [];
        $scope.statisticsOfGameSecond = [];
        $scope.findUuid = '';

        $scope.openTab = function (tab) {
            $scope.tab = tab;
        };

        $scope.issetTab = function(tab) {
            return (tab === $scope.tab);
        };

        $scope.resetTab = function() {
            $scope.tab = 0;
        };

        $scope.showDetail = function () {
            return ($scope.tab !== 0);
        }

        $scope.setStatistics = function () {
            var list = statistics.getAll();

            list.success(function(data) {
                $scope.statisticsOfGame = data;
                $scope.statisticsOfGameSecond = data;
            }).error(function(e) {
               alert("something went wrong!");
            });
        }

        $scope.setOrder = function(order) {
            $scope.order = '-' + order;
        }

        $scope.isOrder = function(order) {
            console.log(order === $scope.order);
            return ('-' + order === $scope.order);
        }
    }]);
