statisticsApp.service("webSocketConnector", function() {
    var webSocket = {
        socket: null,
        subscribes: null,
        messages: [],
        publish: null
    };

    webSocket.init = function (protocol, ip, port) {
        this.socket = WS.connect(protocol + "://" + ip + ':' + port);
        return this;
    };

    webSocket.checkIfSocketIsSet = function () {
        if (!this.socket) {
            alert("socket isn't set yet!");
            return 1;
        }

        return 0;
    };

    webSocket.addSubscribeEvent = function (channel) {
        // add the channel to the array
        this.subscribes = channel;
        return this;
    };

    webSocket.addPublishEvent = function (channel, message) {
        var tmp = [];
        tmp["channel"] = channel;
        tmp["message"] = message;

        this.publish = tmp;
        return this;
    };

    /**
     * AddSubscribeEvents and addPublishEvents needs to be executed first will it be loaded in the connect function
     * @returns {webSocket}
     */
    webSocket.connect = function() {
        this.socket.on("socket/connect", function(session) {
            console.log("successfully connected!");
            if (webSocket.subscribes) {
                session.subscribe(webSocket.subscribes, function(uri, payload) {
                    console.log("received message", payload.msg);
                });
            }

            if(webSocket.publish) {
                session.publish(webSocket.publish["channel"], webSocket.publish["message"]);
            }
        });
    };

    webSocket.disconnect = function () {
        if (this.checkIfSocketIsset() === 1) {
            return this;
        }

        this.socket.on("socket/disconnect", function(error) {
            console.log("Disconnected for " + error.reason + " with code " + error.code);
        });

        return this;
    };

    return webSocket;
});