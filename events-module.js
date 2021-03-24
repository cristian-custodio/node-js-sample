const EventEmitter = require("events");

const emitter = new EventEmitter();

//Register a listener (of the Event)
emitter.on("messageLogged", function () {
  console.log("Listener called");
});

//Raise and Event
emitter.emit("messageLogged");
