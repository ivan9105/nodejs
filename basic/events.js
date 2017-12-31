const EventEmitter = require('events');

class CustomEmitter extends EventEmitter {
}

let emitter = new CustomEmitter();

emitter.on('event', () => {
   console.log('Event occured');
});

emitter.on('event_', () => {
    console.log('Event_ occured');
});
emitter.emit('event_');

emitter.on('event__', function(param1, param2) {
   console.log(param1, param2, this);
});
emitter.emit('event__', 1, 2);

emitter.on('event____', (param1, param2) => {
    setImmediate(() => {
        console.log('this happens asynchronously');
    });
});
emitter.emit('event____', 'a', 'b');

