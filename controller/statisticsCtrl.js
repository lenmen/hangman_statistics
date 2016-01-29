statisticsApp.controller("statisticsCtrl", ["statistics", "$scope", "webSocketConnector",
    function(statistics, $scope, webSocketConnector) {
        $scope.tab = 0;
        $scope.counts = 0;
        $scope.currentPage = 1;
        $scope.pageSize = 10;
        $scope.order = "gameStartedAt";
        $scope.statisticsOfGame = [];
        $scope.statisticsOfGameSecond = [];
        $scope.findUuid = '';
        $scope.message = [];
        $scope.message["uuid"] = null;
        $scope.message["message"] = null;

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
            $scope.orderupdating = '-' + order;
        }

        $scope.isOrder = function(order) {
            return ('-' + order === $scope.order);
        }

        // Socket listener
        $scope.open = webSocketConnector.init('ws', '192.168.33.10','8889');

        var updateMessage = function() {
            console.log(webSocketConnector.message);
            $scope.message = webSocketConnector.message;

            console.log($scope.statisticsOfGame);

            console.log("watch called");
            for(var u = 0; u < $scope.statisticsOfGame.length; u++) {
                // if key found change the value
                if ($scope.statisticsOfGame[u].uuid === $scope.message["uuid"]) {
                    $scope.statisticsOfGame[u].status = $scope.message["message"];
                    $scope.$apply();
                    break;
                }
            }
            console.log("done");
        };

        webSocketConnector.registerObserverCallback(updateMessage);
        webSocketConnector.getMessages();
    }]);
