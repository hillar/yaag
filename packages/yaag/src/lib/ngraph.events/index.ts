// define keys that are allowed as event names
export type EventKey = string | number | Symbol
// define basic function that is allowed for event listeners
export type EventCallback = (...args: any[]) => void

// defined additional event properties that will be added by eventify
export interface EventedType {
  on: (eventName: EventKey, callback: EventCallback, ctx?: any) => this
  off: (eventName?: EventKey, callback?: EventCallback) => this
  fire: (eventName: EventKey, ...args: any[]) => this
}

export function eventify(subject) {
  validateSubject(subject);

  const eventsStorage = createEventsStorage(subject);
  subject.on = eventsStorage.on;
  subject.off = eventsStorage.off;
  subject.fire = eventsStorage.fire;
  return subject;
};

function createEventsStorage(subject) {
  // Store all event listeners to this hash. Key is event name, value is array
  // of callback records.
  //
  // A callback record consists of callback function and its optional context:
  // { 'eventName' => [{callback: function, ctx: object}] }
  let registeredEvents = Object.create(null);

  return {
    on(eventName, callback, ctx) {
      if (typeof callback !== 'function') {
        throw new Error('callback is expected to be a function');
      }
      let handlers = registeredEvents[eventName];
      if (!handlers) {
        handlers = registeredEvents[eventName] = [];
      }
      handlers.push({callback, ctx});

      return subject;
    },

    off(eventName, callback) {
      const wantToRemoveAll = (typeof eventName === 'undefined');
      if (wantToRemoveAll) {
        // Killing old events storage should be enough in this case:
        registeredEvents = Object.create(null);
        return subject;
      }

      if (registeredEvents[eventName]) {
        const deleteAllCallbacksForEvent = (typeof callback !== 'function');
        if (deleteAllCallbacksForEvent) {
          delete registeredEvents[eventName];
        } else {
          const callbacks = registeredEvents[eventName];
          for (let i = 0; i < callbacks.length; ++i) {
            if (callbacks[i].callback === callback) {
              callbacks.splice(i, 1);
            }
          }
        }
      }

      return subject;
    },

    fire(eventName) {
      const callbacks = registeredEvents[eventName];
      if (!callbacks) {
        return subject;
      }

      let fireArguments;
      if (arguments.length > 1) {
        fireArguments = Array.prototype.splice.call(arguments, 1);
      }
      for(let i = 0; i < callbacks.length; ++i) {
        const callbackInfo = callbacks[i];
        callbackInfo.callback.apply(callbackInfo.ctx, fireArguments);
      }

      return subject;
    }
  };
}

function validateSubject(subject) {
  if (!subject) {
    throw new Error('Eventify cannot use falsy object as events subject');
  }
  const reservedWords = ['on', 'fire', 'off'];
  for (let i = 0; i < reservedWords.length; ++i) {
    if (subject.hasOwnProperty(reservedWords[i])) {
      throw new Error(`Subject cannot be eventified, since it already has property '${reservedWords[i]}'`);
    }
  }
}
