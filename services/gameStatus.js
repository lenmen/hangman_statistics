/**
 * Created by lennard on 28-1-16.
 */
statisticsApp.service("gamesStatus", ['webSocketConnector',
    function (webSocketConnector) {
        var gameStatusSocket = {};

        gameStatusSocket.sendStatus = function (status) {
            webSocketConnector.init('ws', '192.168.33.10', '8080');
            webSocketConnector.addSubscribeEvent('hangman/game_status');
            webSocketConnector.addPublishEvent('hangman/game_status', status);
            webSocketConnector.connect();
        };

        gameStatusSocket.getStatus = function () {
            webSocketConnector.init('ws', '192.168.33.10', '8080');
            webSocketConnector.addSubscribeEvent('hangman/game_status');
            webSocketConnector.connect();

        };

        return gameStatusSocket;
    }]);