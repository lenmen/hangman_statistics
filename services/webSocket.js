statisticsApp.service("webSocketConnector", function() {
    var webSocket = {
        socket: null,
        subscribes: null,
        message: null,
        publish: null,
        callbacks: []
    };

    webSocket.init = function (protocol, ip, port) {
        this.socket = new WebSocket(protocol + "://" + ip + ':' + port);

        // Create the connection
        this.socket.onopen = function (e) {
            console.log("Connection established!");
        }

        return this;
    };

    webSocket.registerObserverCallback = function (callback) {
        this.callbacks.push(callback);
    };

    webSocket.notifyObservers = function () {
        angular.forEach(this.callbacks, function (callback) {
            callback();
        });
    };

    webSocket.checkIfSocketIsSet = function () {
        if (!this.socket) {
            alert("socket isn't set yet!");
            return 1;
        }

        return 0;
    };

    webSocket.getMessages = function () {
        if (this.checkIfSocketIsSet() === 0) {
            this.socket.onmessage = function(e) {
                console.log("retrieved message");
                webSocket.message = JSON.parse(e.data);
                webSocket.notifyObservers();
            }
        } else {
            console.log("no connection set");
        }
    };

    webSocket.send = function (msg) {
        if (this.checkIfSocketIsSet() === 0) {
            this.socket.send(msg);
        }
    }

    return webSocket;
});