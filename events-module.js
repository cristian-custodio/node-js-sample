const EventEmitter = require("events");

const emitter = new EventEmitter();

//Register a listener (of the Event)
emitter.on("messageLogged", function (arg) {
  console.log("Listener called", arg);
});

//Raise and Event
emitter.emit("messageLogged", { id: 1, url: "http://" });

//Extending a Module

//var url = "http://mylogger.io/log";

// class Logger extends EventEmitter {
//   log(message) {
//     console.log(message);

//     //Raise and Event
//     this.emit("messageLogged", { id: 1, url: "http://" });
//   }
// }

// module.exports = Logger;
