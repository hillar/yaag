import {bezier as BezierEasing} from '../bezier-easing/src/index';

// Predefined set of animations. Similar to CSS easing functions
const animations = {
  ease:  BezierEasing(0.25, 0.1, 0.25, 1),
  easeIn: BezierEasing(0.42, 0, 1, 1),
  easeOut: BezierEasing(0, 0, 0.58, 1),
  easeInOut: BezierEasing(0.42, 0, 0.58, 1),
  linear: BezierEasing(0, 0, 1, 1)
};


//export default animate;
//export {makeAggregateRaf};

//export var sharedScheduler = makeAggregateRaf();


export function animate(source, target, options) {
  const start = Object.create(null);
  const diff = Object.create(null);
  options = options || {}
  // We let clients specify their own easing function
  let easing = (typeof options.easing === 'function') ? options.easing : animations[options.easing];

  // if nothing is specified, default to ease (similar to CSS animations)
  if (!easing) {
    if (options.easing) {
      console.warn(`Unknown easing function in amator: ${options.easing}`);
    }
    easing = animations.ease
  }

  const step = typeof options.step === 'function' ? options.step : noop;
  const done = typeof options.done === 'function' ? options.done : noop;

  const scheduler = getScheduler(options.scheduler);

  const keys = Object.keys(target);
  keys.forEach(key => {
    start[key] = source[key]
    diff[key] = target[key] - source[key]
  })

  const durationInMs = typeof options.duration === 'number' ? options.duration : 400;
  const durationInFrames = Math.max(1, durationInMs * 0.06); // 0.06 because 60 frames pers 1,000 ms
  let previousAnimationId;
  let frame = 0;

  previousAnimationId = scheduler.next(loop)

  return {
    cancel
  };

  function cancel() {
    scheduler.cancel(previousAnimationId)
    previousAnimationId = 0
  }

  function loop() {
    const t = easing(frame/durationInFrames);
    frame += 1
    setValues(t)
    if (frame <= durationInFrames) {
      previousAnimationId = scheduler.next(loop)
      step(source)
    } else {
      previousAnimationId = 0
      setTimeout(() => { done(source) }, 0)
    }
  }

  function setValues(t) {
    keys.forEach(key => {
      source[key] = diff[key] * t + start[key]
    })
  }
}

function noop() { }

function getScheduler(scheduler) {
  if (!scheduler) {
    const canRaf = typeof window !== 'undefined' && window.requestAnimationFrame;
    return canRaf ? rafScheduler() : timeoutScheduler()
  }
  if (typeof scheduler.next !== 'function') throw new Error('Scheduler is supposed to have next(cb) function')
  if (typeof scheduler.cancel !== 'function') throw new Error('Scheduler is supposed to have cancel(handle) function')

  return scheduler
}

function rafScheduler() {
  return {
    next: window.requestAnimationFrame.bind(window),
    cancel: window.cancelAnimationFrame.bind(window)
  }
}

function timeoutScheduler() {
  return {
    next(cb) {
      return setTimeout(cb, 1000/60)
    },
    cancel(id) {
      return clearTimeout(id)
    }
  };
}

/*
function makeAggregateRaf() {
  let frontBuffer = new Set();
  let backBuffer = new Set();
  let frameToken = 0;

  return {
    next,
    cancel: next,
    clearAll
  };

  function clearAll() {
    frontBuffer.clear();
    backBuffer.clear();
    cancelAnimationFrame(frameToken);
    frameToken = 0;
  }

  function next(callback) {
    backBuffer.add(callback);
    renderNextFrame();
  }

  function renderNextFrame() {
    if (!frameToken) frameToken = requestAnimationFrame(renderFrame);
  }

  function renderFrame() {
    frameToken = 0;

    const t = backBuffer;
    backBuffer = frontBuffer;
    frontBuffer = t;

    frontBuffer.forEach( (callback) => {
      callback();
    });
    frontBuffer.clear();
  }

  function cancel(callback) {
    backBuffer.delete(callback);
  }
}
*/
