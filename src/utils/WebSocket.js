import SocketIOClient from "socket.io-client";

SOCKET_CONNECTION = function SingletonClass() {
  instance = SocketIOClient(SOCKET_CONNECTION, {
    path: SOCKET_PATH,
  });
  return instance;
};
var instance;
var joined = false;
export default {
  getInstance: function() {
    const SOCKET_USER = "9460572885";
    // Hide the constructor so the returned object can't be new'd...

    if (instance == null) {
      instance = new SingletonClass();
      instance.constructor = null;
      instance.on("connect", () => {
        if (instance.connected && SOCKET_USER) {
          joined = true;
          instance.emit("join", {
            userid: SOCKET_USER,
          });
        }
      });

      instance.on("disconnect", (reason) => {
        if (reason === "io server disconnect") {
          // the disconnection was initiated by the server, you need to reconnect manually
          instance.connect();
        }
      });

      instance.on("joined", () => {
        joined = true;
      });

      instance.on("reconnect_attempt", (reconnect_attempt, ...restParams) => {
        console.log("reconnect_attempt", reconnect_attempt, restParams);
      });
    } else {
      if (instance.connected && SOCKET_USER && !joined) {
        instance.emit("join", {
          userid: SOCKET_USER,
        });
      }
    }
    return instance;
  },
};
